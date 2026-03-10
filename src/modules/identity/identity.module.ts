import { Module } from '@nestjs/common';
import { IdentityController } from './http/controllers/identity.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-cases';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';

@Module({
  controllers: [IdentityController],
  providers: [
    CreateUserUseCase,
    PrismaUserRepository,
    {
      provide: 'UserRepository',
      useExisting: PrismaUserRepository,
    },
  ],
})
export class IdentityModule {}