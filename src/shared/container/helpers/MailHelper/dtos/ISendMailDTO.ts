import IParseMailTemplateDTO from '@shared/container/helpers/MailTemplateHelper/dtos/IParseMailTemplateDTO';

interface IMailContat {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContat;
  from?: IMailContat;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
