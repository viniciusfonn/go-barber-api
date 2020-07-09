import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateHelper';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
