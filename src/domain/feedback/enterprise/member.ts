import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Feedback } from './feedback';
import { Project } from './project';

export interface MemberProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  projects?: Project[];
  feedbacks?: Feedback[];
}

export class Member extends Entity<MemberProps> {
  static create(props: MemberProps, id?: UniqueEntityID) {
    const member = new Member(props, id);

    return member;
  }
}
