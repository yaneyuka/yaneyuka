require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user');
const { sendVerificationEmail } = require('./config/email');
const crypto = require('crypto');

const app = express();

// CORS設定（Firebase Hostingからのアクセスを許可）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yaneyuka.web.app, https://yaneyuka.firebaseapp.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB接続成功'))
.catch(err => console.error('MongoDB接続エラー:', err));

// ミドルウェア設定
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24時間
  }
}));

// === 認証関連のAPIエンドポイント ===

// 新規登録API
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 既存ユーザーチェック
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'すでに登録済みのメールアドレスまたはユーザー名です' 
      });
    }
    
    // 認証トークン生成
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // ユーザー作成
    const user = new User({
      username,
      email,
      password,
      verificationToken
    });
    
    await user.save();
    
    // 認証メール送信
    await sendVerificationEmail(email, username, verificationToken);
    
    res.json({ 
      success: true, 
      message: '登録完了！認証メールを送信しました。' 
    });
    
  } catch (error) {
    console.error('登録エラー:', error);
    res.status(500).json({ error: '登録に失敗しました: ' + error.message });
  }
});

// ログイン認証API
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // ユーザーをユーザー名またはメールアドレスで検索
    const user = await User.findOne({ 
      $or: [{ email: username }, { username }] 
    });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'ユーザー名またはパスワードが正しくありません' 
      });
    }
    
    // パスワードを検証
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'ユーザー名またはパスワードが正しくありません' 
      });
    }
    
    // メール認証を確認
    if (!user.isVerified) {
      return res.status(401).json({ 
        error: 'メール認証が完了していません。登録時に送信されたメールを確認してください。' 
      });
    }
    
    // セッションを作成
    req.session.isLoggedIn = true;
    req.session.username = user.username;
    req.session.userId = user._id;
    
    // 最終ログイン時刻を更新
    user.lastLogin = new Date();
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'ログイン成功',
      user: { 
        username: user.username, 
        email: user.email 
      }
    });
    
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ error: 'ログインに失敗しました' });
  }
});

// ログアウトAPI
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'ログアウトに失敗しました' });
    }
    res.json({ success: true, message: 'ログアウト完了' });
  });
});

// 認証状態確認API
app.get('/api/auth-status', (req, res) => {
  res.json({ 
    isLoggedIn: !!(req.session && req.session.isLoggedIn),
    username: req.session ? req.session.username : null
  });
});

// メール認証API
app.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).send(`
        <h2>認証エラー</h2>
        <p>無効な認証トークンです。</p>
        <a href="https://yaneyuka.web.app/login.html">ログインページに戻る</a>
      `);
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    
    res.send(`
      <h2>メール認証完了</h2>
      <p>アカウントが有効化されました。</p>
      <a href="https://yaneyuka.web.app/login.html">ログインページに戻る</a>
    `);
    
  } catch (error) {
    console.error('認証エラー:', error);
    res.status(500).send(`
      <h2>認証エラー</h2>
      <p>認証に失敗しました。</p>
      <a href="https://yaneyuka.web.app/login.html">ログインページに戻る</a>
    `);
  }
});

// ヘルスチェック用エンドポイント
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Vercel用エクスポート
module.exports = app;

// ローカル開発用
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`認証サーバーが http://localhost:${port} で起動しました`);
  });
}
