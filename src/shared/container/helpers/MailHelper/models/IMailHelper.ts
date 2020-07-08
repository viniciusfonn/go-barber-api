export default interface IMailHelper {
  sendMail(to: string, body: string): Promise<void>;
}
