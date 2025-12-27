import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error for extra properties
      transform: true, // Auto-transform payloads to DTO instances
    }),
  );

  // CORS
  app.enableCors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow all local dev origins or check specific list
      const allowedOrigins = [
        configService.get('cors.origin'),
        'http://localhost:3000',
        'http://localhost:3002'
      ];
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  // API prefix
  app.setGlobalPrefix('api');

  const port = configService.get('port') || 3001;
  await app.listen(port);

  console.log(`🚀 Renit API running on http://localhost:${port}/api`);
}

bootstrap();
