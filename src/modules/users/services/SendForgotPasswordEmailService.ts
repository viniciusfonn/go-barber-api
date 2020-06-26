import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/helpers/MailHelper/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

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
    private mailHelper: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailHelper.sendMail(email, 'recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
