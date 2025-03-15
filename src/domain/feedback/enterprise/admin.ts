import { Optional } from 'src/core/types/optional';
import { Entity } from '../../../../src/core/entities/entity';
import { UniqueEntityID } from '../../../../src/core/entities/unique-entity-id';
import { Feedback } from './feedback';
import { Project } from './project';

export interface AdminProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  projects?: Project[];
  feedbacks?: Feedback[];
}

export class Admin extends Entity<AdminProps> {
  get projects(): Project[] | undefined {
    return this.props.projects;
  }

  get feedbacks(): Feedback[] | undefined {
    return this.props.feedbacks;
  }

  static create(props: Optional<AdminProps, 'createdAt'>, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return admin;
  }
}
