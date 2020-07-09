import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailHelper {
  sendMail(data: ISendMailDTO): Promise<void>;
}
