const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, username, token) => {
  // バックエンドのAPIサーバーのURLを環境変数から取得
  const backendUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  
  // 正しい認証用URLを生成
  const verificationUrl = `${backendUrl}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: `"yaneyuka" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'メール認証のお願い',
    html: `
      <h2>メール認証のお願い</h2>
      <p>こんにちは、${username}さん</p>
      <p>以下のリンクをクリックして、アカウントの認証を完了してください。</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>このリンクの有効期限は24時間です。</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`認証メールを ${to} に送信しました。`);
  } catch (error) {
    console.error(`認証メールの送信に失敗しました: ${to}`, error);
    // エラーを再スローして、呼び出し元で処理できるようにする
    throw new Error('メールの送信に失敗しました');
  }
};

module.exports = { sendVerificationEmail };