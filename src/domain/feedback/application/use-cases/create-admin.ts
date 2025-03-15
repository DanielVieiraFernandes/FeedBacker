import { Admin } from '../../enterprise/admin';
import { AdminRepository } from '../repositories/admin-repository';

interface CreateAdminUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateAdminUseCaseResponse {}

export class CreateAdminUseCase {
  constructor(private adminRepository: AdminRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateAdminUseCaseRequest): Promise<CreateAdminUseCaseResponse> {
    const data = Admin.create({
      name,
      email,
      password,
    });

    await this.adminRepository.create(data);

    return {};
  }
}
