import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@vinicius.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('vinicius');
    expect(profile.email).toBe('vinicius@vinicius.com');
  });

  it('should not be able to show the profile from non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
