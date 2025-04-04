import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface FeedbackProps {
  authorId: UniqueEntityID;
  projectId: UniqueEntityID;
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

  get projectId() {
    return this.props.projectId;
  }

  get grade(): number {
    return this.props.grade;
  }

  get title(): string {
    return this.props.title;
  }

  get comment(): string {
    return this.props.comment;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set grade(grade: number | null) {
    if (grade === null) {
      return;
    }

    this.props.grade = grade;
    this.touch();
  }

  set title(title: string | null) {
    if (title === null) {
      return;
    }

    this.props.title = title;
    this.touch();
  }

  set comment(comment: string | null) {
    if (comment === null) {
      return;
    }

    this.props.comment = comment;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
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
