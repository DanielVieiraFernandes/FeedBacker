import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { AdminRepository } from '../repositories/admin-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface AuthenticateAdminUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateAdminUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class AuthenticateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    console.log(admin.id.toString());

    const accessToken = await this.encrypter.encrypt({
      sub: admin.id.toString(),
    });

    return {
      accessToken,
    };
  }
}
