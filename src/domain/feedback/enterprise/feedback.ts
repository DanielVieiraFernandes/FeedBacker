import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface FeedbackProps {
  authorId: UniqueEntityID;
  grade: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Feedback extends Entity<FeedbackProps> {
  get authorId() {
    return this.props.authorId;
  }

  get grade() {
    return this.props.grade;
  }

  static create(
    props: Optional<FeedbackProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const feedback = new Feedback(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return feedback;
  }
}
