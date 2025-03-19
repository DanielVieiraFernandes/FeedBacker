import { AnswerRepository } from "@/domain/feedback/application/repositories/answer-repository";
import { Answer } from "@/domain/feedback/enterprise/answer";


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
  async delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
