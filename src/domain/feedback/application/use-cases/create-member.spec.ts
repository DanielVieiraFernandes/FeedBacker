import { InMemoryMemberRepository } from '../../../../../test/repositories/in-memory-member-repository';
import { CreateMemberUseCase } from './create-member';

let inMemoryMemberRepository: InMemoryMemberRepository;
let sut: CreateMemberUseCase;

describe('Member Unit Tests', () => {
  beforeEach(() => {
    inMemoryMemberRepository = new InMemoryMemberRepository();
    sut = new CreateMemberUseCase(inMemoryMemberRepository);
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
        password: '123456',
      })
    );
  });
});
