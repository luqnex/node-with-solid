import { User } from "../../entities/User";
import { MailProvider } from "../../providers/MailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";

import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}

  async execute(data: CreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("user already existis.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe meu app",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo!",
      body: "<p>Você ja pode fazer login</p>",
    });
  }
}
