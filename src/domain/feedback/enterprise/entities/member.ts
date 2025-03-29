import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface MemberProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Member extends Entity<MemberProps> {
  set name(name: string) {
    this._props.name = name;
  }

  set email(email: string) {
    this._props.email = email;
  }

  set password(password: string) {
    this._props.password = password;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

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
