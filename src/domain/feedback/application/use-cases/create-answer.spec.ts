import { makeAdmin } from '@/domain/test/factories/make-admin';
import { CreateAnswerUseCase } from './create-answer';
import { InMemoryAnswerRepository } from '@/domain/test/repositories/in-memory-answer-repository';
import { makeFeedback } from '@/domain/test/factories/make-feedback';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: CreateAnswerUseCase;
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new CreateAnswerUseCase(inMemoryAnswerRepository);
  });

  it('Should be able to create a feedback', async () => {
    const admin = makeAdmin();
    const feedback = makeFeedback({
        authorId: admin.id
    });

    await sut.execute({
        authorId: admin.id.toString(),
        feedbackId: feedback.id.toString(),
        content: "New answer"
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(1);
    expect(inMemoryAnswerRepository.items).toEqual(expect.arrayContaining([
        expect.objectContaining({
            authorId: admin.id,
            feedbackId: feedback.id,
            content: "New answer"
        })
    ]))
  });
});
