import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IdentityController } from './http/controllers/identity.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-cases';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';
import { ArgonPasswordHasher } from './infrastructure/security/argon-password-hasher';
import { LoginUserUseCase } from './application/use-cases/login-user.use-cases';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('auth.jwtSecret'),
      signOptions: {
        expiresIn: configService.get<string>('auth.jwtExpiresIn') || '1d',
      },
    }),
  }),
  ],
  controllers: [IdentityController],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    PrismaUserRepository,
    ArgonPasswordHasher,
    JwtStrategy,
    {
      provide: 'UserRepository',
      useExisting: PrismaUserRepository,
    },
    {
      provide: 'PasswordHasher',
      useExisting: ArgonPasswordHasher,
    },
  ],
})
export class IdentityModule {}