import { container } from 'tsyringe';

import IStorageHelper from './StorageHelper/models/IStorageHelper';
import DiskStorageHelper from './StorageHelper/implementations/DiskStorageHelper';

import IMailHelper from './MailHelper/models/IMailHelper';
import EtherealMailHelper from './MailHelper/implementations/EtherealMailHelper';

import IMailTemplateHelper from './MailTemplateHelper/models/IMailTemplateHelper';
import handlebarsMailTemplateHelper from './MailTemplateHelper/implementations/HandlebarsMailTemplateHelper';

container.registerSingleton<IStorageHelper>('StorageHelper', DiskStorageHelper);

container.registerSingleton<IMailTemplateHelper>(
  'MailTemplateHelper',
  handlebarsMailTemplateHelper,
);

container.registerInstance<IMailHelper>(
  'IMailHelper',
  container.resolve(EtherealMailHelper),
);
