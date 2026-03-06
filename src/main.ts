import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  const rawOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || '*';
  const allowedOrigins = rawOrigin.split(',').map((o) => o.trim());

  Logger.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);

  app.enableCors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Hochu API')
    .setDescription('API documentation for Hochu marketplace')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // If we are not on Vercel, listen on the port
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const port = process.env.PORT || 8080;
    await app.listen(port);
    Logger.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║          Hochu API Server                         ║
║                                                   ║
║  Server running on: http://localhost:${port}         ║
║  Environment: ${process.env.NODE_ENV || 'development'}                         ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
      `);
    Logger.log(`Swagger documentation: http://localhost:${port}/api/docs`);
  }

  // Export for Vercel
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp;
}

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  bootstrap();
}

// Export for Vercel serverless function
export const handler = async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};

export default handler;
