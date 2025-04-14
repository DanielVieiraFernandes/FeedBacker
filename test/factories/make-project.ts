import {
  Project,
  ProjectProps,
} from '@/domain/feedbacker/enterprise/entities/project';
import { ProjectAttachmentList } from '@/domain/feedbacker/enterprise/entities/project-attachment-list';
import { PrismaProjectMapper } from '@/infra/database/prisma/mappers/prisma-project-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueEntityID
) {
  const project = Project.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.word.noun(),
      description: faker.lorem.words(),
      repositoryLink: faker.internet.url(),
      updatedAt: faker.date.anytime(),
      createdAt: new Date(),
      ...override,
    },
    id
  );

  return project;
}

@Injectable()
export class ProjectFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProject(data: Partial<ProjectProps> = {}): Promise<Project> {
    const project = makeProject(data);

    await this.prisma.project.create({
      data: PrismaProjectMapper.toPrisma(project),
    });

    return project;
  }
}
