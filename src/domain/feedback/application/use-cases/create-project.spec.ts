import { makeAdmin } from '../../../../../test/factories/make-admin';
import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository';
import { InMemoryMemberRepository } from '../../../../../test/repositories/in-memory-member-repository';
import { InMemoryProjectRepository } from '../../../../../test/repositories/in-memory-project-repository';
import { CreateProjectUseCase } from './create-project';

let inMemoryMemberRepository: InMemoryMemberRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let inMemoryProjectRepository: InMemoryProjectRepository;
let sut: CreateProjectUseCase;

describe('Create Project', () => {
  beforeEach(() => {
    inMemoryMemberRepository = new InMemoryMemberRepository();
    inMemoryAdminRepository = new InMemoryAdminRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository();
    sut = new CreateProjectUseCase(
      inMemoryProjectRepository,
      inMemoryMemberRepository,
      inMemoryAdminRepository
    );
  });

  it.skip('should be able to create a member user', async () => {
    
    const admin = makeAdmin(); 

    await sut.execute({
        authorId: admin.id.toString(),
        description: "description",
        image: "./src/image.jpg",
        status: "New status",
        title: "New Title",
        visible: "public"
    });

    expect(inMemoryProjectRepository.items).toHaveLength(1);

  });
});
