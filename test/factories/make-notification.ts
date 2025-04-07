import {
  Notification,
  NotificationProps,
} from '@/domain/notifications/enterprise/entities/notification';
import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      content: faker.lorem.sentence(10),
      title: faker.lorem.sentence(8),
      ...override,
    },
    id
  );

  return notification;
}
