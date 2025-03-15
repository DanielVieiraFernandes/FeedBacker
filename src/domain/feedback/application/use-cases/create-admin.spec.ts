import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository';
import { CreateAdminUseCase } from './create-admin';

let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: CreateAdminUseCase;

describe('Admin Unit Tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository();
    sut = new CreateAdminUseCase(inMemoryAdminRepository);
  });

  it('should be able to create a admin user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(inMemoryAdminRepository.items).toHaveLength(1);
    expect(inMemoryAdminRepository.items[0].props).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    );
  });
});
