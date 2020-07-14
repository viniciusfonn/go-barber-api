// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashHelper from '../helpers/HashHelper/fakes/FakeHashHelper';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashHelper: FakeHashHelper;
  let createUser: CreateUserService;
  let authenticateUser: AuthenticateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashHelper = new FakeHashHelper();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashHelper);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashHelper,
    );
  });

  it('should be able to authenticate', async () => {
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
    await expect(
      authenticateUser.execute({
        email: 'joao@joao.com',
        password: 'joao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await createUser.execute({
      name: 'joao',
      email: 'joao@joao.com',
      password: 'joao',
    });

    await expect(
      authenticateUser.execute({
        email: 'joao@joao.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
