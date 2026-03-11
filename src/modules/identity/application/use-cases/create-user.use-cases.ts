import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordHasher } from '../../domain/services/password-hasher';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: CreateUserDto) {
    const normalizedEmail = input.email.trim().toLowerCase();

    const emailAlreadyExists =
      await this.userRepository.existsByEmail(normalizedEmail);

    if (emailAlreadyExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    const user = await this.userRepository.create({
      name: input.name,
      email: normalizedEmail,
      password: hashedPassword,
      role: input.role,
    });

    return user;
  }
}