import { FakeEncrypter } from '@/domain/test/cryptography/fake-encrypter';
import { FakeHasher } from '@/domain/test/cryptography/fake-hasher';
import { makeMember } from '@/domain/test/factories/make-member';
import { InMemoryMemberRepository } from '@/domain/test/repositories/in-memory-member-repository';
import { AuthenticateMemberUseCase } from './authenticate-member';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

let inMemoryMemberRepository: InMemoryMemberRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateMemberUseCase;

describe('Create Member', () => {
  beforeEach(() => {
    inMemoryMemberRepository = new InMemoryMemberRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateMemberUseCase(
      inMemoryMemberRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it('should be able to authenticate a member with email and password', async () => {
    const member = makeMember({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryMemberRepository.items.push(member);

    const { accessToken } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(accessToken).toEqual(expect.any(String));
  });

  it('should not be able authenticate with wrong credentials', async () => {
    const member = makeMember({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryMemberRepository.items.push(member);

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
