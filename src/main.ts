import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; //valida e logs
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //per vedere endpoints e data 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug']
  });
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe());

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('LBD - Projects API')
    .setDescription('API Documentation for users management and favorite projects.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // UI disponibile a /api-docs
  logger.log('📄 Swagger UI is available at /api-docs');


  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', { infer: true}) ?? 3000;
  const dbUri = configService.get<string>('MONGODB_URI', { infer: true});

  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}`);
  logger.log(`✅ Successfully connected to database: ${dbUri}`);  
}
bootstrap();
