import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { Feedback } from '../feedback';

export class FeedbackCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public feedback: Feedback;

  constructor(feedback: Feedback) {
    this.ocurredAt = new Date();
    this.feedback = feedback;
  }

  getAggregateId(): UniqueEntityID {
    return this.feedback.id;
  }
}
