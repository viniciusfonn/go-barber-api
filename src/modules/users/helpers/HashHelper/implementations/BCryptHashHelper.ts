import { hash, compare } from 'bcryptjs';
import IHashHelper from '../models/IHashHelper';

class BCryptHashHelper implements IHashHelper {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashHelper;
