import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/optional';
import { Entity } from '../../..//core/entities/entity';
import { Attachment } from './attachment';

export interface ProjectProps {
  authorId?: UniqueEntityID;
  title: string;
  description: string;
  image: string;
  status: string;
  attachment?: Attachment;
  visible: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Project extends Entity<ProjectProps> {
  get authorId(): UniqueEntityID | undefined {
    return this.props.authorId;
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get image() {
    return this.props.image;
  }

  get status() {
    return this.props.status;
  }

  get visible() {
    return this.props.visible;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ProjectProps, 'createdAt' | 'authorId'>,
    id?: UniqueEntityID
  ) {
    const project = new Project(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        authorId: props.authorId ?? undefined,
      },
      id
    );

    return project;
  }
}
