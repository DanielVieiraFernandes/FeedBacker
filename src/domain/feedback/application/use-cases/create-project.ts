import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Project } from '../../enterprise/project';
import { AdminRepository } from '../repositories/admin-repository';
import { MemberRepository } from '../repositories/member-repository';
import { ProjectRepository } from '../repositories/project-repository';
import { UserNotAllowedError } from './errors/user-not-allowed';

interface CreateProjectUseCaseRequest {
  title: string;
  description: string;
  image: string;
  status: string;
  visible: string;
  authorId: string;
}

interface CreateProjectUseCaseResponse {
  project: Project;
}

export class CreateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private memberRepository: MemberRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    description,
    image,
    status,
    title,
    visible,
    authorId,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const data = Project.create({
      description,
      image,
      status,
      title,
      visible,
    });

    await this.projectRepository.create(data);

    let id: UniqueEntityID;

    const member = await this.memberRepository.findById(authorId);

    if (member) {
      id = member.id;
      data.authorId = id;
    }

    const admin = await this.adminRepository.findById(authorId);

    if (admin) {
      id = admin.id;
      data.authorId = id;
    }

    if (!admin && !member) {
      throw new UserNotAllowedError();
    }

    await this.projectRepository.save(data);

    return {
      project: data,
    };
  }
}
