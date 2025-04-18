import { MemberAlreadyExistsError } from '@/core/error/errors/member-already-exists';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryMemberRepository } from 'test/repositories/in-memory-member-repository';
import { Member } from '../../enterprise/entities/member';
import { CreateMemberUseCase } from './create-member';

let inMemoryMemberRepository: InMemoryMemberRepository;
let fakeHasher: FakeHasher;
let sut: CreateMemberUseCase;

describe('Create Member', () => {
  beforeEach(() => {
    inMemoryMemberRepository = new InMemoryMemberRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateMemberUseCase(inMemoryMemberRepository, fakeHasher);
  });

  it('should be able to create a member user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(inMemoryMemberRepository.items).toHaveLength(1);
    expect(inMemoryMemberRepository.items[0].props).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456-hashed',
      })
    );
  });

  it('should not be able to create a member when email exists', async () => {
    inMemoryMemberRepository.create(
      Member.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    );

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(MemberAlreadyExistsError);
  });
});
