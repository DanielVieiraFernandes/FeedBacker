import { AdminRepository } from '@/domain/feedbacker/application/repositories/admin-repository';
import { Admin } from '@/domain/feedbacker/enterprise/entities/admin';

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = [];

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = this.items.find(item => item.props.email === email);

    if (!admin) {
      return null;
    }

    return admin;
  }

  async create(admin: Admin) {
    this.items.push(admin);
  }

  save(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Admin | null> {
    throw new Error('Method not implemented.');
  }
}
