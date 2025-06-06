require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const User = require('../models/user');
const { sendVerificationEmail } = require('../config/email');
const crypto = require('crypto');

const app = express();

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(mongoUri);
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB接続エラー:', err);
    res.status(503).json({ error: 'データベースに接続できませんでした。' });
  }
});

// === APIエンドポイント ===

// ヘルスチェック用API（診断モード）
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    mongodb: dbStatus,
    BASE_URL_from_Vercel: process.env.BASE_URL,
    BACKEND_URL_from_Vercel: process.env.BACKEND_URL
  });
});

// ユーザー登録API
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: 'このメールアドレスまたはユーザー名は既に使用されています。' });
    }
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({ username, email, password, verificationToken });
    await user.save();
    await sendVerificationEmail(email, username, verificationToken);
    res.status(201).json({ success: true, message: '登録が完了しました。アカウントを有効にするための確認メールを送信しました。' });
  } catch (error) {
    console.error('登録エラー:', error);
    res.status(500).json({ error: '登録中にエラーが発生しました。' });
  }
});

// ログイン認証API
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (!user) {
      return res.status(401).json({ error: 'ユーザー名またはパスワードが正しくありません。' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'ユーザー名またはパスワードが正しくありません。' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ error: 'メール認証が完了していません。登録時に送信されたメールを確認してください。' });
    }
    req.session.isLoggedIn = true;
    req.session.username = user.username;
    req.session.userId = user._id;
    user.lastLogin = new Date();
    await user.save();
    res.json({ success: true, message: 'ログインに成功しました。', user: { username: user.username, email: user.email }});
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ error: 'ログイン中にエラーが発生しました。' });
  }
});

// ログアウトAPI
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'ログアウトに失敗しました。' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'ログアウトしました。' });
  });
});

// 認証状態確認API
app.get('/api/auth-status', (req, res) => {
  if (req.session.isLoggedIn && req.session.username) {
    res.json({ isLoggedIn: true, username: req.session.username });
  } else {
    res.json({ isLoggedIn: false, username: null });
  }
});

// メール認証エンドポイント（最終診断モード）
app.get('/api/verify-email', async (req, res) => {
  try {
    console.log('--- メール認証APIが呼び出されました ---');
    const { token } = req.query;
    console.log('受け取ったトークン:', token);

    if (!token) {
      console.log('エラー: トークンがありません。');
      return res.redirect(`${process.env.BASE_URL}/login?verified=error`);
    }

    console.log('データベースでこのトークンを検索します...');
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      console.log('成功: ユーザーが見つかりました:', user.email);
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      console.log('ユーザー情報を更新し、認証成功でリダイレクトします。');
      res.redirect(`${process.env.BASE_URL}/login?verified=true`);
    } else {
      console.log('失敗: トークンに一致するユーザーが見つかりませんでした。');
      res.redirect(`${process.env.BASE_URL}/login?verified=false`);
    }
  } catch (error) {
    console.error('致命的なエラー: メール認証プロセスがクラッシュしました。', error);
    res.status(500).redirect(`${process.env.BASE_URL}/login?verified=error`);
  }
});

// Vercelが使えるようにappをエクスポート
module.exports = app;
