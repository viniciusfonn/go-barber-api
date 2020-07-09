import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateHelper {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
