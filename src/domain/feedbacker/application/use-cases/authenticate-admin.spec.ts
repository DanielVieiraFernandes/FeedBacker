import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeAdmin } from 'test/factories/make-admin';
import { InMemoryAdminRepository } from 'test/repositories/in-memory-admin-repository';
import { AuthenticateAdminUseCase } from './authenticate-admin';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

let inMemoryAdminRepository: InMemoryAdminRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateAdminUseCase;

describe('Create Admin', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateAdminUseCase(
      inMemoryAdminRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it('should be able to authenticate a admin with email and password', async () => {
    const admin = makeAdmin({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryAdminRepository.items.push(admin);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(result.isRight()).toBe(true);
  });

  it('should not be able authenticate with wrong credentials', async () => {
    const admin = makeAdmin({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryAdminRepository.items.push(admin);

    const result = await sut.execute({
      email: admin.email,
      password: '123457',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
