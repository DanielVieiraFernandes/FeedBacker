import { makeFeedback } from 'test/factories/make-feedback';
import { makeProject } from 'test/factories/make-project';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback-repository';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { InMemoryProjectAttachmentsRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { waitFor } from 'test/utils/wait-for';
import { MockInstance } from 'vitest';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { OnFeedbackCreated } from './on-feedback-created';

let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let inMemoryProjectAttachmentsRepository: InMemoryProjectAttachmentsRepository;
let inMemoryProjectsRepository: InMemoryProjectRepository;
let sut: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>;

describe('on feedback created', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    inMemoryProjectAttachmentsRepository =
      new InMemoryProjectAttachmentsRepository();
    inMemoryProjectsRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentsRepository
    );
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);

    sendNotificationExecuteSpy = vi.spyOn(sut, 'execute');

    new OnFeedbackCreated(inMemoryProjectsRepository, sut);
  });

  it('should send a notification when feeedback is created', async () => {
    const project = makeProject();
    const feedback = makeFeedback({
      projectId: project.id,
    });

    inMemoryProjectsRepository.create(project);
    inMemoryFeedbackRepository.create(feedback);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
