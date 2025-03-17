import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface FeedbackProps {
  authorId: UniqueEntityID;
  grade: number;
  comment: Comment;
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

  get comment(): Comment | undefined {
    return this.props.comment;
  }

  set comment(comment: Comment) {
    this.props.comment = comment;
  }

  static create(props: FeedbackProps, id?: UniqueEntityID) {
    const feedback = new Feedback(props, id);

    return feedback;
  }
}
