import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';
import { Attachment } from '../entities/attachment';

export interface ProjectDetailsProps {
  projectId: UniqueEntityID;
  authorId: UniqueEntityID;
  author: string;
  title: string;
  description: string;
  repositoryLink: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class ProjectDetails extends ValueObject<ProjectDetailsProps> {
  get projectId() {
    return this.props.projectId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get author() {
    return this.props.author;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get repositoryLink() {
    return this.props.repositoryLink;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: ProjectDetailsProps) {
    return new ProjectDetails(props);
  }
}
