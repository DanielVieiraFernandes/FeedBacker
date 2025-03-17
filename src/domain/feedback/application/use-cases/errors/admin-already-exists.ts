export class AdminAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Admin ${email} address already exists`);
  }
}
