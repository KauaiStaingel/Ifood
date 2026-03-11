export interface PasswordHasher {
  hash(value: string): Promise<string>;
  verify(hash: string, plain: string): Promise<boolean>;
}