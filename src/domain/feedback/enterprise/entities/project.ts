import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { ProjectAttachment } from './project-attachment';

export interface ProjectProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  repositoryLink: string;
  attachments: ProjectAttachment[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Project extends Entity<ProjectProps> {
  get authorId() {
    return this.props.authorId;
  }

  get repositoryLink() {
    return this.props.repositoryLink;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get attachments() {
    return this.props.attachments;
  }

  set attachments(attachments: ProjectAttachment[]) {
    this.props.attachments = attachments;
  }

  set repositoryLink(repositoryLink: string) {
    this.props.repositoryLink = repositoryLink;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string) {
    this.props.description = description;
  }

  static create(
    props: Optional<ProjectProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const project = new Project(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return project;
  }
}
