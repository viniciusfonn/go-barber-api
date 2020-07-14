import FakeStorageHelper from '@shared/container/helpers/StorageHelper/fakes/FakeStorageHelper';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageHelper: FakeStorageHelper;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageHelper = new FakeStorageHelper();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageHelper,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'foto.jpg',
    });

    await expect(user.avatar).toBe('foto.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'fake-user',
        avatarFilename: 'foto.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageHelper, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'foto.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'foto2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('foto.jpg');

    expect(user.avatar).toBe('foto2.jpg');
  });
});
