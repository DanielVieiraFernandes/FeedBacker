import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { ProjectAttachment } from './project-attachment';
import { ProjectAttachmentList } from './project-attachment-list';

export interface ProjectProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  repositoryLink: string;
  attachments: ProjectAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Project extends Entity<ProjectProps> {
  get authorId() {
    return this.props.authorId;
  }

  get repositoryLink(): string {
    return this.props.repositoryLink;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
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

  set attachments(attachments: ProjectAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  set repositoryLink(repositoryLink: string | null) {
    if (repositoryLink === null) return;

    this.props.repositoryLink = repositoryLink;
    this.touch();
  }

  set title(title: string | null) {
    if (title === null) return;

    this.props.title = title;
    this.touch();
  }

  set description(description: string | null) {
    if (description === null) {
      return;
    }

    this.props.description = description;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ProjectProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID
  ) {
    const project = new Project(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new ProjectAttachmentList(),
      },
      id
    );

    return project;
  }
}
