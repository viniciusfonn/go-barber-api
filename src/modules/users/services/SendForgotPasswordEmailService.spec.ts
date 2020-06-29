// import AppError from '@shared/errors/AppError';
import FakeMailHelper from '@shared/container/helpers/MailHelper/fakes/FakeMailHelper';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailHelper = new FakeMailHelper();

    const sendMail = jest.spyOn(fakeMailHelper, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailHelper,
    );

    await fakeUsersRepository.create({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'anderson@anderson.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailHelper = new FakeMailHelper();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailHelper,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'anderson@anderson.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
