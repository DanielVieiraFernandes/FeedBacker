import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | UserNotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new UserNotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({
      notification,
    });
  }
}
