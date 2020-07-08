import { container } from 'tsyringe';

import IStorageHelper from './StorageHelper/models/IStorageHelper';
import DiskStorageHelper from './StorageHelper/implementations/DiskStorageHelper';

import IMailHelper from './MailHelper/models/IMailHelper';
import EtherealMailHelpe from './MailHelper/implementations/EtherealMailHelper';

container.registerSingleton<IStorageHelper>('StorageHelper', DiskStorageHelper);

container.registerInstance<IMailHelper>('IMailHelper', new EtherealMailHelpe());
