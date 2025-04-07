import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Feedback } from '@/domain/feedbacker/enterprise/entities/feedback';
import { Prisma, Feedback as PrismaFeedback } from '@prisma/client';

export class PrismaFeedbackMapper {
  static toDomain(raw: PrismaFeedback): Feedback {
    return Feedback.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        projectId: new UniqueEntityID(raw.projectId),
        comment: raw.comment,
        grade: raw.grade,
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(feedback: Feedback): Prisma.FeedbackUncheckedCreateInput {
    return {
      id: feedback.id.toString(),
      authorId: feedback.authorId.toString(),
      projectId: feedback.projectId.toString(),
      comment: feedback.comment,
      grade: feedback.grade,
      title: feedback.title,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    };
  }
}
