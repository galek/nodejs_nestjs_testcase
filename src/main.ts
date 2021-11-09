import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import helmet from "helmet";
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(csurf());
  app.enableCors();
  // app.use(helmet());
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI
  });

  const config = new DocumentBuilder()
      .setTitle('Galek example of http microservice')
      .setDescription('The API description of example of http microservice')
      .setVersion('1.0')
      .addTag('Galek micro-service')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process?.env?.PORT ?? 3000);
}
bootstrap();
