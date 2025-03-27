import { Answer } from '../../enterprise/answer';

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<void>;
  abstract save(answer: Answer): Promise<void>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract findManyByFeedbackId(feedbackId: string, page: number): Promise<Answer[]>;
  abstract delete(answer: Answer): Promise<void>;
}
