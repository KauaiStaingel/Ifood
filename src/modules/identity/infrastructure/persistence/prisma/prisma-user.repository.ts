import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return !!user;
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}



// O que essa classe faz

// Ela é o adapter de infraestrutura.

// Ela traduz o contrato abstrato UserRepository para uma implementação concreta usando Prisma.

// Esse é o ponto de contato entre:

// domínio/aplicação

// tecnologia de banco