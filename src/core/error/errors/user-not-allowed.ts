export class UserNotAllowedError extends Error {
  constructor() {
    super("User not allowed");
  }
}
