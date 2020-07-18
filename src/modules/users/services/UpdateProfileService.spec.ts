import AppError from '@shared/errors/AppError';
import FakeHashHelper from '../helpers/HashHelper/fakes/FakeHashHelper';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashHelper: FakeHashHelper;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashHelper = new FakeHashHelper();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashHelper,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'vinicius f',
      email: 'vinicius@viniciusf.com',
    });

    expect(updatedUser.name).toBe('vinicius f');
    expect(updatedUser.email).toBe('vinicius@viniciusf.com');
  });
  it('should not be able to update the profile from non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'test',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'anothervinicius',
      email: 'anothervinicius@vinicius.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'vinicius',
        email: 'vinicius@vinicius.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'vinicius f',
      email: 'vinicius@viniciusf.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'vinicius f',
        email: 'vinicius@viniciusf.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'vinicius f',
        email: 'vinicius@viniciusf.com',
        old_password: 'wrong password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
