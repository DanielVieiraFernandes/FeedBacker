import { Domain } from 'domain';
import { DomainEvents } from '@/core/events/domain-events';
import { FeedbackRepository } from '@/domain/feedbacker/application/repositories/feedback-repository';
import { findByIdProps } from '@/domain/feedbacker/application/repositories/interfaces/find-by-d-interface';
import { Feedback } from '@/domain/feedbacker/enterprise/entities/feedback';

export class InMemoryFeedbackRepository implements FeedbackRepository {
  public items: Feedback[] = [];

  async create(feedback: Feedback): Promise<void> {
    this.items.push(feedback);

    DomainEvents.dispatchEventsForAggregate(feedback.id);
  }

  async save(feedback: Feedback): Promise<void> {
    const findItemIndex = this.items.findIndex(item => item.id === feedback.id);

    this.items[findItemIndex] = feedback;

    DomainEvents.dispatchEventsForAggregate(feedback.id);
  }

  async findById({ id }: findByIdProps): Promise<Feedback | null> {
    const feedback = this.items.find(item => item.id.toString() === id);

    if (!feedback) {
      return null;
    }

    return feedback;
  }

  async findByProject(projectId: string, page: number): Promise<Feedback[]> {
    const data = this.items.filter(
      feedback => feedback.projectId.toString() === projectId
    );
    const feedback = data
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return feedback;
  }
}
