import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const swaggerDocument = YAML.load('./doc/api.yaml');

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
