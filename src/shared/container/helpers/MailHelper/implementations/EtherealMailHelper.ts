import nodemailer, { Transporter } from 'nodemailer';

import IMailHelper from '../models/IMailHelper';

export default class EtherealMailProvider implements IMailHelper {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
      console.log(account);
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    await this.client.sendMail({
      from: 'equipe do vinal',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });
  }
}
