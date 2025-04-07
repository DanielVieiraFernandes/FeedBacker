import { Either, left, right } from '@/core/either';
import { Feedback } from '../../enterprise/entities/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';
import { FeedbackDoesNotExistError } from './errors/feedback-does-not-exist';
import { UserNotAllowedError } from './errors/user-not-allowed';

interface EditFeedbackUseCaseRequest {
  authorId: string;
  feedbackId: string;
  title: string | null;
  comment: string | null;
  grade: number | null;
}

type EditFeedbackUseCaseResponse = Either<
  FeedbackDoesNotExistError | UserNotAllowedError,
  {
    feedback: Feedback;
  }
>;

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
      id: feedbackId,
    });

    if (!feedback) {
      return left(new FeedbackDoesNotExistError());
    }

    if (authorId !== feedback.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    feedback.title = title;
    feedback.comment = comment;
    feedback.grade = grade;

    await this.feedbackRepository.save(feedback);

    return right({
      feedback,
    });
  }
}
