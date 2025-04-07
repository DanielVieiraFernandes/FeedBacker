import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { makeNotification } from 'test/factories/make-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { ReadNotificationUseCase } from './read-notification';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('1'),
    });

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: '1',
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('1'),
    });

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: '2',
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
