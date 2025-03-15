import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
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
  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id);

    return admin;
  }
}
