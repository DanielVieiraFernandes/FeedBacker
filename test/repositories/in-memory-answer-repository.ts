import { AnswerRepository } from '@/domain/feedback/application/repositories/answer-repository';
import { Answer } from '@/domain/feedback/enterprise/entities/answer';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.');
  }

  async findManyByFeedbackId(
    feedbackId: string,
    page: number
  ): Promise<Answer[]> {
    const answers = this.items
      .filter(answer => answer.feedbackId.toString() === feedbackId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
