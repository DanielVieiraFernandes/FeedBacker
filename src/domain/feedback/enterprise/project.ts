import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/optional';
import { Entity } from '../../../core/entities/entity';
import { Attachment } from './attachment';

export interface ProjectProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  link: string;
  images?: Attachment[];
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

  get images() {
    return this.props.images;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ProjectProps, 'createdAt' | 'images'>,
    id?: UniqueEntityID
  ) {
    const project = new Project(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        images: props.images ?? undefined,
      },
      id
    );

    return project;
  }
}
