import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import env from './shared/config/env';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { HealthController } from './shared/interfaces/http/health.controller';
import { IdentityModule } from './modules/identity/identity.module';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    PrismaModule,
    IdentityModule,
    CatalogModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}