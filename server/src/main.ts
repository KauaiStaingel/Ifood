import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaService } from './shared/infrastructure/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api/v1';
  const port = configService.get<number>('app.port') || 3000;
  const appName = configService.get<string>('app.name') || 'IFOOD';

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${appName} API`)
    .setDescription('Backend do projeto de estudo estilo iFood')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await prismaService.enableShutdownHooks(app);

  await app.listen(port);

  console.log(`${appName} running on http://localhost:${port}/${apiPrefix}`);
  console.log(`Swagger on http://localhost:${port}/docs`);
}

bootstrap();