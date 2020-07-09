import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailHelper from '../models/IMailHelper';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateHelper from '../../MailTemplateHelper/models/IMailTemplateHelper';

@injectable()
export default class EtherealMailProvider implements IMailHelper {
  private client: Transporter;

  constructor(
    @inject('MailTemplateHelper')
    private mailTemplateHelper: IMailTemplateHelper,
  ) {
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

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe',
        address: from?.email || 'Equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateHelper.parse(templateData),
    });
  }
}
