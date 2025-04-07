import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repositories/answer-repository';

interface DeleteFeedbackAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteFeedbackAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UserNotAllowedError,
  {}
>;

@Injectable()
export class DeleteFeedbackAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteFeedbackAnswerUseCaseRequest): Promise<DeleteFeedbackAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
