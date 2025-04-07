import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Admin } from '../../enterprise/entities/admin';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdminRepository } from '../repositories/admin-repository';
import { AdminAlreadyExistsError } from './errors/admin-already-exists';

interface CreateAdminUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateAdminUseCaseResponse = Either<AdminAlreadyExistsError, {}>;

@Injectable()
export class CreateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateAdminUseCaseRequest): Promise<CreateAdminUseCaseResponse> {
    const admin = await this.adminRepository.findByEmail(email);

    if (admin) {
      return left(new AdminAlreadyExistsError(admin.email));
    }

    const passwordHashed = await this.hashGenerator.hash(password);

    const data = Admin.create({
      name,
      email,
      password: passwordHashed,
    });

    await this.adminRepository.create(data);

    return right({});
  }
}
