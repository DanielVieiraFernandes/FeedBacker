import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  Feedback,
  FeedbackProps,
} from 'src/domain/feedback/enterprise/feedback';
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
