import { HashComparer } from '@/domain/feedbacker/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/feedbacker/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return hash(plain, 8);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
