import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { Injectable } from '@nestjs/common';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface EditFeedbackAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditFeedbackAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UserNotAllowedError,
  {
    answer: Answer;
  }
>;

@Injectable()
export class EditFeedbackAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditFeedbackAnswerUseCaseRequest): Promise<EditFeedbackAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
