import { WrongCredentialsError } from '@/core/error/errors/wrong-credentials-error';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeMember } from 'test/factories/make-member';
import { InMemoryMemberRepository } from 'test/repositories/in-memory-member-repository';
import { AuthenticateMemberUseCase } from './authenticate-member';

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

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able authenticate with wrong credentials', async () => {
    const member = makeMember({
      password: await fakeHasher.hash('123456'),
    });

    inMemoryMemberRepository.items.push(member);

    const result = await sut.execute({
      email: member.email,
      password: '123457',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
