import { makeFeedback } from 'test/factories/make-feedback';
import { makeProject } from 'test/factories/make-project';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback-repository';
import { FetchFeedbacksByProjectUseCase } from './fetch-feedbacks-by-project';

let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
let sut: FetchFeedbacksByProjectUseCase;

describe('Fetch recents feedbacks by project', () => {
  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    sut = new FetchFeedbacksByProjectUseCase(inMemoryFeedbackRepository);
  });

  it('should be able to fetch recent feedbacks by project', async () => {
    const project = makeProject();
    for (let i = 1; i <= 24; i++) {
      await inMemoryFeedbackRepository.create(
        makeFeedback({
          projectId: project.id,
          title: `Feedback-${i}`,
        })
      );
    }

    const { feedbacks } = await sut.execute({
      projectId: project.id.toString(),
      page: 2,
    });

    console.log(feedbacks);

    expect(feedbacks).toHaveLength(4);
  });
});
