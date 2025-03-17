import { HashGenerator } from '@/domain/feedback/application/cryptography/hash-generator';

export class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }
}
