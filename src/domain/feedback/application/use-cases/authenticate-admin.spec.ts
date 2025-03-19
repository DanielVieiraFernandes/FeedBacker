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

    const { accessToken } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(accessToken).toEqual(expect.any(String));
  });

  it('should not be able authenticate with wrong credentials', async () => {
    const admin = makeAdmin({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryAdminRepository.items.push(admin);

    await expect(() =>
      sut.execute({
        email: 'errado@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError);

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123457',
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError);
  });
});
