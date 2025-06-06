const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, username, token) => {
  const backendUrl = process.env.BACKEND_URL;
  const verificationUrl = `${backendUrl}/api/verify-email?token=${token}`;

  // ★★★ここから診断コード★★★
  console.log('--- 認証メール送信プロセス開始 ---');
  console.log('環境変数 BACKEND_URL:', process.env.BACKEND_URL);
  console.log('生成された認証URL:', verificationUrl);
  // ★★★ここまで診断コード★★★

  const mailOptions = {
    from: `"yaneyuka" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'メール認証のお願い',
    html: `
      <h2>メール認証のお願い</h2>
      <p>こんにちは、${username}さん</p>
      <p>以下のリンクをクリックして、アカウントの認証を完了してください。</p>
      <p>このリンクをクリック: <a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>このリンクの有効期限は24時間です。</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`認証メールを ${to} に送信しました。`);
  } catch (error) {
    console.error(`認証メールの送信に失敗しました: ${to}`, error);
    throw new Error('メールの送信に失敗しました');
  }
};

module.exports = { sendVerificationEmail };