import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Attachment } from './attachment';

export interface ProjectProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  image: string;
  status: string;
  attachment: Attachment;
  visible: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Project extends Entity<ProjectProps> {
  get authorId() {
    return this.props.authorId;
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

  static create(props: ProjectProps, id?: UniqueEntityID) {
    const project = new Project(props, id);

    return project;
  }
}
