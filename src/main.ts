import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
