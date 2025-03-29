import {
  Feedback,
  FeedbackProps,
} from '@/domain/feedback/enterprise/entities/feedback';
import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export function makeFeedback(
  override: Partial<FeedbackProps> = {},
  id?: UniqueEntityID
) {
  const feedback = Feedback.create(
    {
      authorId: new UniqueEntityID(),
      grade: faker.number.int(),
      title: faker.lorem.sentence(),
      comment: faker.lorem.paragraph(),
      projectId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return feedback;
}
