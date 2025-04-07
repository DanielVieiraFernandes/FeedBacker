export class FeedbackDoesNotExistError extends Error {
    constructor() {
      super('Feedback does not exist');
    }
  }
  