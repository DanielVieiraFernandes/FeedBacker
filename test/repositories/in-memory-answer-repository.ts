import { AnswerRepository } from '@/domain/feedbacker/application/repositories/answer-repository';
import { Answer } from '@/domain/feedbacker/enterprise/entities/answer';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    if (itemIndex > -1) {
      this.items[itemIndex] = answer;
    }
  }
  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find(item => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
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
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
    }
  }
}
