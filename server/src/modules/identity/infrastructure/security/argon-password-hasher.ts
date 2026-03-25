import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PasswordHasher } from '../../domain/services/password-hasher';

@Injectable()
export class ArgonPasswordHasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    return argon2.hash(value);
  }

  async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}