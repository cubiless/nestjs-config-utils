import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}

bootstrap();
