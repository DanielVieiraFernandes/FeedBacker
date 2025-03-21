import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface FeedbackProps {
  authorId: UniqueEntityID;
  grade: number;
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Feedback extends Entity<FeedbackProps> {
  get authorId() {
    return this.props.authorId;
  }

  get grade() {
    return this.props.grade;
  }
  get title() {
    return this.props.title;
  }
  get comment() {
    return this.props.comment;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
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
