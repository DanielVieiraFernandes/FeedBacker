export class MemberAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Member ${email} address already exists`);
  }
}
