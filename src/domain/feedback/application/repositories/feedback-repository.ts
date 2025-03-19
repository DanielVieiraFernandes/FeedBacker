import { Feedback } from '../../enterprise/feedback';

export abstract class FeedbackRepository {
  abstract create(feedback: Feedback): Promise<void>;
  abstract save(feedback: Feedback): Promise<void>;
  abstract findById(id: string): Promise<Feedback | null>;
}
