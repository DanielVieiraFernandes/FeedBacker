import { FakeHasher } from '@/domain/test/cryptography/fake-hasher';
import { InMemoryAdminRepository } from '@/domain/test/repositories/in-memory-admin-repository';
import { Admin } from '../../enterprise/admin';
import { CreateAdminUseCase } from './create-admin';
import { AdminAlreadyExistsError } from './errors/admin-already-exists';

let inMemoryAdminRepository: InMemoryAdminRepository;
let fakeHasher: FakeHasher;
let sut: CreateAdminUseCase;

describe('Admin Unit Tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateAdminUseCase(inMemoryAdminRepository, fakeHasher);
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
        password: '123456-hashed',
      })
    );
  });

  it('should not be able to create a member when email exists', async () => {
    inMemoryAdminRepository.create(
      Admin.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        feedbacks: [],
        projects: [],
      })
    );

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AdminAlreadyExistsError);
  });
});
