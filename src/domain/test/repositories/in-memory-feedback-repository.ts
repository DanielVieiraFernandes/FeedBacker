import { FeedbackRepository } from '@/domain/feedback/application/repositories/feedback-repository';
import { Feedback } from '@/domain/feedback/enterprise/feedback';

export class InMemoryFeedbackRepository implements FeedbackRepository {
  public items: Feedback[] = [];

  async create(feedback: Feedback): Promise<void> {
    this.items.push(feedback);
  }
  save(feedback: Feedback): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Feedback | null> {
    throw new Error('Method not implemented.');
  }
}
