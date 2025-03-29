import { Feedback } from '../../enterprise/entities/feedback';
import { findByIdProps } from './interfaces/find-by-d-interface';

export abstract class FeedbackRepository {
  abstract create(feedback: Feedback): Promise<void>;
  abstract save(feedback: Feedback): Promise<void>;
  abstract findById(params: findByIdProps): Promise<Feedback | null>;
  abstract findByProject(projectId: string, page: number): Promise<Feedback[]>;
}
