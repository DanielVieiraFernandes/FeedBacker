import { AnswerRepository } from '@/domain/feedbacker/application/repositories/answer-repository';
import { Answer } from '@/domain/feedbacker/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  constructor(private prisma: PrismaService) {}

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.create({ data });
  }
  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.update({
      where: {
        id: data.id,
        authorId: data.authorId,
      },
      data,
    });
  }
  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      return null;
    }

    return PrismaAnswerMapper.toDomain(answer);
  }
  async findManyByFeedbackId(
    feedbackId: string,
    page: number
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        feedbackId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }
  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
        authorId: answer.authorId.toString(),
        feedbackId: answer.feedbackId.toString(),
      },
    });
  }
}
