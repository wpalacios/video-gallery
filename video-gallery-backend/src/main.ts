import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  console.log(`Application started on port ${PORT}`);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
