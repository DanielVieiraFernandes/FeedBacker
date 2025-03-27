import { Answer } from '../../enterprise/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface FetchFeedbackAnswersUseCaseRequest {
  feedbackId: string;
  page: number;
}

interface FetchFeedbackAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchFeedbackAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    feedbackId,
    page,
  }: FetchFeedbackAnswersUseCaseRequest): Promise<FetchFeedbackAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByFeedbackId(
      feedbackId,
      page
    );

    return {
      answers,
    };
  }
}
