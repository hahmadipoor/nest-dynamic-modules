import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware2';
import { HttpExceptionFilter } from './custom-errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    abortOnError: false,
  });
  await app.listen(3000);
}
bootstrap();
