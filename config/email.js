const nodemailer = require('nodemailer');

// メール送信設定
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// 認証メール送信
const sendVerificationEmail = async (email, username, token) => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"yaneyuka" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'yaneyuka - メール認証のお願い',
      html: `
        <h2>こんにちは、${username}さん</h2>
        <p>yaneyukaへのご登録ありがとうございます。</p>
        <p>以下のリンクをクリックして認証を完了してください：</p>
        <a href="${verificationUrl}">アカウントを認証する</a>
        <p>このリンクは24時間有効です。</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('認証メール送信成功');
    
  } catch (error) {
    console.error('メール送信エラー:', error);
    throw new Error('メール送信に失敗しました');
  }
};

module.exports = {
  sendVerificationEmail
};