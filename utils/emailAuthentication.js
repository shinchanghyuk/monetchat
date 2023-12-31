const nodemailer = require('nodemailer');

const logger = require('./log4js.js'); 

// 설정 파일에서 이메일 설정 추출
const emailUser = process.env.email_user;
const emailPassword = process.env.email_password;

// nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});

// 인증 코드 이메일 보내기 함수
const sendAuthenticationEmail = async (email, code) => {
  let result = false;
  try {
    const mailOptions = {
      from: 'monetchat',
      to: email,
      subject: '이메일 인증 코드',
      text: '이메일 인증코드: ' + code,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('emailAuthentcation - email send result : ', info.response);

    result = true;

  } catch (error) {
    logger.error('emailAuthentcation - email send Exception : ', error);
    result = false;
  }

  return result;
};

// 모듈로 내보내기
module.exports = {
    sendAuthenticationEmail
  };
