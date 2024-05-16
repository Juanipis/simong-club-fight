import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Fight Club Simon G API')
    .setDescription(
      'Parcial de ingeniería Web - Juan Pablo Díaz Correa y Natalia Naranjo Rodríguez' +
        '\n\n![Image Description](https://i.gifer.com/76fh.gif)', // Asegúrate de reemplazar con la URL de tu imagen,
    )
    .setVersion('1.0')
    .addTag('Fights')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'User JWT Authentication',
    )

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
