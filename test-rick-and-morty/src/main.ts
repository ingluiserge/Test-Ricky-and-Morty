import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import database from './models/index';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function assertDatabaseConnection(): Promise<void> {
  try {
    await database.authenticate();
    await database.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API rick and morty in graphql')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = () => SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('docs', app, document);

  await assertDatabaseConnection();  
}

bootstrap();
