import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/optional';
import { Entity } from '../../../core/entities/entity';
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
  static create(
    props: Optional<MemberProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const member = new Member(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return member;
  }
}
