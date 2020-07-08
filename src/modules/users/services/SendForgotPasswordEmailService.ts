import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IMailHelper from '@shared/container/helpers/MailHelper/models/IMailHelper';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailHelper')
    private mailHelper: IMailHelper,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailHelper.sendMail(email, `recuperação de senha: ${token}`);
  }
}

export default SendForgotPasswordEmailService;
