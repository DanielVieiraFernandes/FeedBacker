import { AdminRepository } from '../../src/domain/feedback/application/repositories/admin-repository';
import { Admin } from '../../src/domain/feedback/enterprise/admin';

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = [];

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
