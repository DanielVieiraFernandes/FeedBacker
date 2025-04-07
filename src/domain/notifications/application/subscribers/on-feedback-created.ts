import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { ProjectRepository } from '@/domain/feedbacker/application/repositories/project-repository';
import { FeedbackCreatedEvent } from '@/domain/feedbacker/enterprise/entities/events/feedback-created-event';
import { SendNotificationUseCase } from '../use-cases/send-notification';

export class OnFeedbackCreated implements EventHandler {
  constructor(
    private projectRepository: ProjectRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewFeedbackNotification.bind(this),
      FeedbackCreatedEvent.name
    );
  }

  private async sendNewFeedbackNotification({
    feedback,
  }: FeedbackCreatedEvent) {
    const project = await this.projectRepository.findById({
      id: feedback.projectId.toString(),
    });

    if (project) {
      await this.sendNotification.execute({
        recipientId: project.authorId.toString(),
        title: `Novo feedback no seu projeto: "${project.title.substring(0, 40).concat('...')}" `,
        content: feedback.comment.substring(0, 50).concat('...'),
      });
    }
  }
}
