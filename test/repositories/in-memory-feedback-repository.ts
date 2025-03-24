import { FeedbackRepository } from '@/domain/feedback/application/repositories/feedback-repository';
import { findByIdProps } from '@/domain/feedback/application/repositories/interfaces/find-by-d-interface';
import { Feedback } from '@/domain/feedback/enterprise/feedback';

export class InMemoryFeedbackRepository implements FeedbackRepository {
  public items: Feedback[] = [];

  async create(feedback: Feedback): Promise<void> {
    this.items.push(feedback);
  }

  async save(feedback: Feedback): Promise<void> {
    const findItemIndex = this.items.findIndex(item => item.id === feedback.id);

    this.items[findItemIndex] = feedback;
  }

  async findById({ authorId, id }: findByIdProps): Promise<Feedback | null> {
    const feedback = this.items.find(
      item => item.id.toString() === id && item.authorId.toString() === authorId
    );

    if (!feedback) {
      return null;
    }

    return feedback;
  }
}
