import { container } from 'tsyringe';

import IHashHelper from './HashHelper/models/IHashHelper';
import BCryptHashHelper from './HashHelper/implementations/BCryptHashHelper';

container.registerSingleton<IHashHelper>('HashHelper', BCryptHashHelper);
