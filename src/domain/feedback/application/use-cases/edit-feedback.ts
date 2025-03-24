import { Feedback } from '../../enterprise/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';
import { FeedbackDoesNotExistError } from './errors/feedback-does-not-exist';

interface EditFeedbackUseCaseRequest {
  authorId: string;
  feedbackId: string;
  title: string;
  comment: string;
  grade: number;
}

interface EditFeedbackUseCaseResponse {
  feedback: Feedback;
}

export class EditFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    authorId,
    feedbackId,
    comment,
    grade,
    title,
  }: EditFeedbackUseCaseRequest): Promise<EditFeedbackUseCaseResponse> {
    const feedback = await this.feedbackRepository.findById({
      authorId,
      id: feedbackId,
    });

    if (!feedback) {
      throw new FeedbackDoesNotExistError();
    }

    feedback.title = title;
    feedback.comment = comment;
    feedback.grade = grade;

    await this.feedbackRepository.save(feedback);

    return {
      feedback,
    };
  }
}
