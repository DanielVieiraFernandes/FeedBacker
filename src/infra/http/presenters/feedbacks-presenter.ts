import { Feedback } from '@/domain/feedbacker/enterprise/entities/feedback';

export class FeedbacksPresenter {
  static toHttp(feedback: Feedback) {
    return {
      projectId: feedback.projectId.toString(),
      authorId: feedback.authorId.toString(),
      title: feedback.title,
      comment: feedback.comment,
      grade: feedback.grade,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    };
  }
}
