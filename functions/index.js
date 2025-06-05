require('dotenv').config();

const { onRequest } = require("firebase-functions/v2/https");
const mongoose = require('mongoose');
const User = require('./models/user');
const { sendVerificationEmail } = require('./config/email');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB接続成功'))
  .catch(err => console.error('MongoDB接続エラー:', err));

// Express アプリの作成
const app = express();

// CORS設定（重要：Firebase Hostingからのアクセスを許可）
app.use(cors({ origin: true }));
app.use(express.json());

// === 認証関連のAPIエンドポイント ===

// 新規登録API
app.post('/register', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// メール認証API
app.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).send('無効な認証トークンです');
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    
    res.send(`
      <h2>メール認証完了</h2>
      <p>アカウントが有効化されました。</p>
      <a href="https://your-firebase-app.web.app/login.html">ログインページに戻る</a>
    `);
    
  } catch (error) {
    console.error('認証エラー:', error);
    res.status(500).send('認証に失敗しました');
  }
});

// Firebase Function としてエクスポート
exports.api = onRequest(app);