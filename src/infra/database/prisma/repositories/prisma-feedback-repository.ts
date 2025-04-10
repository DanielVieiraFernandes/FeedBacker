import { FeedbackRepository } from '@/domain/feedbacker/application/repositories/feedback-repository';
import { findByIdProps } from '@/domain/feedbacker/application/repositories/interfaces/find-by-d-interface';
import { Feedback } from '@/domain/feedbacker/enterprise/entities/feedback';
import { Injectable } from '@nestjs/common';
import { PrismaFeedbackMapper } from '../mappers/prisma-feedback-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFeedbackRepository implements FeedbackRepository {
  constructor(private prisma: PrismaService) {}

  async create(feedback: Feedback): Promise<void> {
    const data = PrismaFeedbackMapper.toPrisma(feedback);

    await this.prisma.feedback.create({
      data,
    });
  }

  async save(feedback: Feedback): Promise<void> {
    const data = PrismaFeedbackMapper.toPrisma(feedback);

    await this.prisma.feedback.update({
      where: {
        id: data.id,
        authorId: data.authorId,
      },
      data,
    });
  }

  async findById({ id }: findByIdProps): Promise<Feedback | null> {
    const feedback = await this.prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedback) {
      return null;
    }

    return PrismaFeedbackMapper.toDomain(feedback);
  }

  async findByProject(projectId: string, page: number): Promise<Feedback[]> {

    console.log('Received values:', { projectId, page, skip: (page - 1) * 20 });
    
    const feedbacks = await this.prisma.feedback.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return feedbacks.map(PrismaFeedbackMapper.toDomain);
  }
}
