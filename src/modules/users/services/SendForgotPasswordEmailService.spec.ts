// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeMailHelper from '@shared/container/helpers/MailHelper/fakes/FakeMailHelper';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailHelper: FakeMailHelper;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailHelper = new FakeMailHelper();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailHelper,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailHelper, 'sendMail');

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
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'anderson@anderson.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'anderson',
      email: 'anderson@anderson.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'anderson@anderson.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
