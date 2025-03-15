import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface CommentProps {
  authorId: UniqueEntityID;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Comment extends Entity<CommentProps> {
  get authorId() {
    return this.props.authorId;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  static create(props: CommentProps, id?: UniqueEntityID) {
    const comment = new Comment(props, id);

    return comment;
  }
}
