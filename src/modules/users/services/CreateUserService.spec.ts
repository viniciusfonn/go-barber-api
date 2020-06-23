import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashHelper from '../helpers/HashHelper/fakes/FakeHashHelper';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashHelper = new FakeHashHelper();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );

    const user = await createUser.execute({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with duplicated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashHelper = new FakeHashHelper();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );

    await createUser.execute({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'anderson',
        email: 'anderson@anderson.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
