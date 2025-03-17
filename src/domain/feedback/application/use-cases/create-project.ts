import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Project } from '../../enterprise/project';
import { ProjectRepository } from '../repositories/project-repository';

interface CreateProjectUseCaseRequest {
  authorId: string;
  title: string;
  description: string;
  link: string;
}

interface CreateProjectUseCaseResponse {}

export class CreateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    authorId,
    title,
    description,
    link,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const data = Project.create({
      authorId: new UniqueEntityID(authorId),
      description,
      link,
      title,
    });

    await this.projectRepository.create(data);

    return {};
  }
}
