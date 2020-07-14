import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashHelper from '../helpers/HashHelper/fakes/FakeHashHelper';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashHelper: FakeHashHelper;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashHelper = new FakeHashHelper();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashHelper);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with duplicated email', async () => {
    await createUser.execute({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'anderson',
        email: 'anderson@anderson.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
