export class ProjectDoesNotExistError extends Error {
  constructor() {
    super('Project does not exist');
  }
}
