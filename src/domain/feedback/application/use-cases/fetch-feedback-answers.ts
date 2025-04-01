import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface FetchFeedbackAnswersUseCaseRequest {
  feedbackId: string;
  page: number;
}

type FetchFeedbackAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

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

    return right({
      answers,
    });
  }
}
