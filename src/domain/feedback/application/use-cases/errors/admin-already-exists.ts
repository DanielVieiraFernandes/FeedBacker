import { ErrorMessage } from '@/core/error/error-message';

export class AdminAlreadyExistsError extends Error implements ErrorMessage {
  constructor(email: string) {
    super(`Admin ${email} address already exists`);
  }
}
