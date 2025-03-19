import { Answer } from '@/domain/feedback/enterprise/answer';
import { Prisma } from '@prisma/client';

export class PrismaAnswerMapper {
  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      feedbackId: answer.feedbackId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }
}
