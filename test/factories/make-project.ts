import {
  Project,
  ProjectProps,
} from '@/domain/feedbacker/enterprise/entities/project';
import { ProjectAttachmentList } from '@/domain/feedbacker/enterprise/entities/project-attachment-list';
import { faker } from '@faker-js/faker';
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
      attachments: new ProjectAttachmentList(),
      ...override,
    },
    id
  );

  return project;
}
