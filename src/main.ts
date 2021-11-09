import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from 'compression';
import * as helmet from "helmet";
// import * as csurf from 'csurf';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO: must be configured
    // app.use(csurf());
    app.enableCors();
    app.use(helmet());
    app.use(compression());
    app.enableVersioning({
        type: VersioningType.URI
    });

    const config = new DocumentBuilder()
        .setTitle('Galek example of http microservice')
        .setDescription('This is finished test-case for position of NodeJS backend Developer at Bell Integrator')
        .setVersion('1.0')
        .addTag('Galek micro-service')
        .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                in: 'header',
                bearerFormat: 'JWT'
            },
            'access-token')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process?.env?.PORT ?? 3000);
}

bootstrap();
