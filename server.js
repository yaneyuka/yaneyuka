require('dotenv').config(); // 環境変数を .env ファイルから読み込む

const mongoose = require('mongoose');
const User = require('./models/user');
const { sendVerificationEmail } = require('./config/email');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB接続成功'))
.catch(err => console.error('MongoDB接続エラー:', err));

const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// 必要なディレクトリを作成
fs.ensureDirSync('./uploads/');
fs.ensureDirSync('./downloads/');

// アップロードされたファイルの保存先
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.ensureDirSync('./uploads/');
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// multerエラーハンドリング関数
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // multer固有のエラー
    console.error('Multerエラー:', err);
    return res.status(400).json({ error: `アップロードエラー: ${err.message}` });
  } else if (err) {
    // その他のエラー
    console.error('アップロードエラー:', err);
    return res.status(400).json({ error: err.message });
  }
  next();
};

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('PDFファイルのみアップロード可能です'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB制限
  }
});

// 静的ファイル (HTML, CSS, JS) を配信するためのミドルウェア
app.use(express.static(path.join(__dirname, 'public')));

// セッション管理のミドルウェア
app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24時間
}));

// アップロードされたファイルを提供
app.use('/downloads', express.static('downloads'));

// トップページとして public/index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PDFページとして public/pdf.html を返す
app.get('/pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pdf.html'));
});

// PDFアップロードと圧縮処理
app.post('/compress-pdf', upload.single('pdf'), multerErrorHandler, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'ファイルがアップロードされていません' });
    }

    const inputPath = req.file.path;
    const outputDir = './downloads/';
    fs.ensureDirSync(outputDir);
    
    const outputFilename = 'compressed-' + req.file.originalname;
    const outputPath = path.join(outputDir, outputFilename);

    // PDF-libを使用した圧縮処理
    try {
      const existingPdfBytes = await fs.readFile(inputPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // より効果的な圧縮設定
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
        updateFieldAppearances: false,
      });
      
      // 圧縮されたPDFを保存
      await fs.writeFile(outputPath, pdfBytes);
      
      // ファイルサイズの比較
      const originalSize = (await fs.stat(inputPath)).size;
      const compressedSize = (await fs.stat(outputPath)).size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      // 一時ファイルを削除
      await fs.unlink(inputPath);
      
      console.log(`PDF圧縮完了: ${outputFilename}, 圧縮率: ${compressionRatio}%`);
      
      res.json({ 
        success: true, 
        message: `PDFが圧縮されました（圧縮率: ${compressionRatio}%）`,
        downloadUrl: `/downloads/${outputFilename}`,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: compressionRatio
      });
    } catch (compressionError) {
      // 圧縮に失敗した場合は元のファイルをコピー
      console.warn('PDF圧縮失敗、元ファイルをコピーします:', compressionError.message);
      await fs.copyFile(inputPath, outputPath);
      await fs.unlink(inputPath);
      
      res.json({ 
        success: true, 
        message: 'PDFが処理されました（圧縮は適用されませんでした）',
        downloadUrl: `/downloads/${outputFilename}`
      });
    }
  } catch (error) {
    console.error('PDF処理エラー:', error);
    // エラー発生時にも一時ファイルが残っていれば削除を試みる
    if (req.file && req.file.path) {
        try {
            if (await fs.pathExists(req.file.path)) {
                await fs.unlink(req.file.path);
                console.log('エラー発生のため一時ファイルを削除:', req.file.path);
            }
        } catch (unlinkError) {
            console.error('エラー発生後の一時ファイル削除エラー:', unlinkError);
        }
    }
    res.status(500).json({ error: 'PDF処理中にエラーが発生しました: ' + error.message });
  }
});

// JSONリクエストボディをパースするためのミドルウェア
app.use(express.json());

// === 認証関連のAPIエンドポイント ===

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
      <a href="/login.html">ログインページに戻る</a>
    `);
    
  } catch (error) {
    console.error('認証エラー:', error);
    res.status(500).send('認証に失敗しました');
  }
});

// 認証ミドルウェア
function requireAuth(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// userpageのルート（認証必須）
app.get('/userpage', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userpage.html'));
});

// ログインページのルート
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// === 認証関連のAPIエンドポイント終了 ===

// --- APIエンドポイント --- (ここから下にメール関連のAPIを追加していきます)

// 例: アカウント一覧を取得するAPI (ダミー)
app.get('/api/accounts', (req, res) => {
    // TODO: 実際のアカウント情報を返す処理
    res.json([
        { id: 'account1', name: '個人用メール (Gmail)', email: 'my.personal@gmail.com' },
        { id: 'account2', name: '仕事用メール (Outlook)', email: 'work.address@example.com' },
        // さらにアカウント情報を追加可能
    ]);
});

// 例: 特定アカウントのメール一覧を取得するAPI (ダミー)
app.get('/api/accounts/:accountId/emails', (req, res) => {
    const { accountId } = req.params;
    // TODO: accountIdに基づいて実際のメールリストを取得する処理
    console.log(`アカウント ${accountId} のメール一覧をリクエストされました。`);

    // ダミーデータ
    const emails = {
        account1: [
            { id: 'mail1-1', from: 'sender1@example.com', subject: '【アカウント1】重要なお知らせ', date: '2023-10-28T10:00:00Z', snippet: 'これはアカウント1の重要なお知らせのメールです...全文を読むにはクリック' },
            { id: 'mail1-2', from: 'sender2@example.com', subject: '【アカウント1】会議のリマインダー', date: '2023-10-27T15:30:00Z', snippet: '明日の会議のリマインダーです。資料を確認してください...' },
        ],
        account2: [
            { id: 'mail2-1', from: 'client@company.com', subject: '【アカウント2】プロジェクトAの進捗について', date: '2023-10-28T09:15:00Z', snippet: 'プロジェクトAの最新進捗をご報告します。' },
            { id: 'mail2-2', from: 'colleague@example.com', subject: '【アカウント2】ランチのお誘い', date: '2023-10-26T12:00:00Z', snippet: '今日のランチ、一緒にどうですか？' },
        ]
    };

    res.json(emails[accountId] || []);
});

// 例: 特定のメールを取得するAPI (ダミー)
app.get('/api/emails/:emailId', (req, res) => {
    const { emailId } = req.params;
    // TODO: emailIdに基づいて実際のメール内容を取得する処理
    console.log(`メール ${emailId} の内容をリクエストされました。`);

    // ダミーデータ (実際にはもっと詳細な情報が必要)
    const emailContent = {
        'mail1-1': { 
            id: 'mail1-1', 
            from: 'sender1@example.com', 
            to: 'my.personal@gmail.com', 
            subject: '【アカウント1】重要なお知らせ', 
            date: '2023-10-28T10:00:00Z', 
            body: '<p>これはアカウント1の重要なお知らせのメールです。</p><p>詳細はこちらのリンクをご確認ください。</p>'
        },
        // 他のメールのダミーデータも同様に追加
    };
    res.json(emailContent[emailId] || { error: 'メールが見つかりません', body: '' });
});

// 例: メールを送信するAPI (ダミー)
app.post('/api/send', (req, res) => {
    const { accountId, to, subject, body } = req.body;
    // TODO: accountId を使って適切な送信元からメールを送信する処理 (Nodemailerなどを使用)
    console.log('メール送信リクエスト:', { accountId, to, subject, body });
    // ここで Nodemailer などを使って実際のメール送信処理を実装
    res.json({ success: true, message: 'メールが送信されました (ダミー)。' });
});

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error('サーバーエラー:', err);
  res.status(500).json({ error: 'サーバーエラーが発生しました: ' + err.message });
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
