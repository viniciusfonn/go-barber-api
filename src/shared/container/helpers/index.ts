import { container } from 'tsyringe';

import IStorageHelper from './StorageHelper/models/IStorageHelper';
import DiskStorageHelper from './StorageHelper/implementations/DiskStorageHelper';

container.registerSingleton<IStorageHelper>('StorageHelper', DiskStorageHelper);
