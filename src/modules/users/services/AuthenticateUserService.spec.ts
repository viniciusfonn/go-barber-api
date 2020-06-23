// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashHelper from '../helpers/HashHelper/fakes/FakeHashHelper';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashHelper = new FakeHashHelper();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );

    const user = await createUser.execute({
      name: 'joao',
      email: 'joao@joao.com',
      password: 'joao',
    });

    const response = await authenticateUser.execute({
      email: 'joao@joao.com',
      password: 'joao',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashHelper = new FakeHashHelper();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );

    expect(
      authenticateUser.execute({
        email: 'joao@joao.com',
        password: 'joao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashHelper = new FakeHashHelper();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );

    await createUser.execute({
      name: 'joao',
      email: 'joao@joao.com',
      password: 'joao',
    });

    expect(
      authenticateUser.execute({
        email: 'joao@joao.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
