import { container } from 'tsyringe';

import IStorageHelper from './StorageHelper/models/IStorageHelper';
import DiskStorageHelper from './StorageHelper/implementations/DiskStorageHelper';

// import IMailHelper from './MailHelper/models/IMailProvider';

container.registerSingleton<IStorageHelper>('StorageHelper', DiskStorageHelper);
