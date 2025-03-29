import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AdminProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
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
