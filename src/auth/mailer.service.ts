/*eslint-disable */
// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meraklus.ceo@gmail.com',
        pass: 'afwq uxsi lqat obnw',
      },
    });
  }

  async sendMail(email: string, code: string) {
    // 인증 URL을 생성합니다. 이 URL은 실제 프로젝트에 맞게 수정해야 합니다.
    const confirmationUrl = `https://merakl.co.kr/api/auth/confirm?email=${email}&code=${code}`;

    const info = await this.transporter.sendMail({
      from: 'meraklus.ceo@gmail.com',
      to: email,
      subject: '가입 확인',
      html: `
      <p>가입을 완료하려면 아래 버튼을 클릭하십시오:</p>
      <a href="${confirmationUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">가입 확인</a>
      
    `,
    });
  }

  async sendEmail(email: string, newPassword: string) {
    const info = await this.transporter.sendMail({
      from: 'meraklus.ceo@gmail.com',
      to: email,
      subject: '임시 비밀번호 발송',
      html: `
      <div style="display: flex; justify-content: center; margin-top: 7%">
      <div
        class="card"
        style="
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 50%;
          height: 200px;
        "
      >
        <div class="card-content">
          <h3
            class="card-title"
            style="
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
              text-align: center;
            "
          >
            아래 임시 비밀번호를 복사하여 마이페이지에서 비밀번호를 수정하세요!
          </h3>
          <p
            class="card-description"
            style="
              font-size: 14px;
              color: #666;
              margin-bottom: 10px;
              text-align: center;
              margin-top: 7%;
            "
          >
            ${newPassword}
          </p>
        </div>
      </div>
    </div>
    `,
    });
  }
}
