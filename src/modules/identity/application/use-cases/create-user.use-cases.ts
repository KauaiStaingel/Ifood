import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.existsByEmail(input.email);

    if (emailAlreadyExists) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
    });

    return user;
  }
}




// O que esse caso de uso faz

// Ele orquestra a regra de criação:

// recebe os dados

// verifica se o email já existe

// se existir, lança erro

// se não existir, cria o usuário

// retorna o usuário criado

// Observação importante

// Aqui ainda estamos gravando a senha em texto puro?

// Sim, por enquanto.

// E isso não é final.

// Estamos fazendo isso para validar o fluxo arquitetural primeiro.

// No próximo passo, antes de considerar isso “pronto”, vamos introduzir:

// PasswordHasher

// argon2

// Mas agora queremos primeiro provar o fluxo:

// HTTP → controller → use case → repository → Prisma → banco