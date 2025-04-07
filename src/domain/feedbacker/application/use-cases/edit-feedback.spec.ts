import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FeedbackDoesNotExistError } from '@/core/error/errors/feedback-does-not-exist';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { makeAdmin } from 'test/factories/make-admin';
import { makeFeedback } from 'test/factories/make-feedback';
import { makeMember } from 'test/factories/make-member';
import { makeProject } from 'test/factories/make-project';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback-repository';
import { EditFeedbackUseCase } from './edit-feedback';

let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
let sut: EditFeedbackUseCase;

describe('Edit Feedback', () => {
  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    sut = new EditFeedbackUseCase(inMemoryFeedbackRepository);
  });

  it('should be able to edit feedback', async () => {
    const member = makeMember({
      name: 'John Doe',
    });

    const newFeedback = makeFeedback({
      authorId: member.id,
      comment: 'Muito bacana!',
      grade: 4,
      title: 'Ótimo projeto',
    });

    inMemoryFeedbackRepository.items.push(newFeedback);

    const result = await sut.execute({
      authorId: member.id.toString(),
      feedbackId: newFeedback.id.toString(),
      comment: 'Idéia bacana, simples porém útil, muito boa para praticar',
      grade: 5,
      title: 'Perfeito',
    });

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.isRight()).toBe(true);
    expect(result.value?.feedback).toEqual(
      expect.objectContaining({
        authorId: member.id,
        comment: 'Idéia bacana, simples porém útil, muito boa para praticar',
        grade: 5,
        title: 'Perfeito',
      })
    );
  });

  it('should not able to edit feedback when another user', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('author-1'));
    const feedback = makeFeedback({
      authorId: admin.id,
    });

    await inMemoryFeedbackRepository.create(feedback);

    const result = await sut.execute({
      authorId: 'author-2',
      title: feedback.title,
      comment: feedback.comment,
      feedbackId: feedback.id.toString(),
      grade: feedback.grade,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
