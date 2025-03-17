import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/optional';
import { Entity } from '../../../core/entities/entity';

export interface ProjectProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  repositoryLink: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Project extends Entity<ProjectProps> {
  get authorId(): UniqueEntityID | undefined {
    return this.props.authorId;
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId;
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
