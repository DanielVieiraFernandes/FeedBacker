import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Answer,  AnswerProps} from '@/domain/feedback/enterprise/answer';
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.words(),
      feedbackId: new UniqueEntityID(),
      createdAt: new Date(),
      ...override,
    },
    id
  );

  return answer;
}
