import { NestFactory } from "@nestjs/core";
import {  ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { validateEnvironment } from "./config/env.config";
import { appConfig } from "./config/app.config";
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './filters/global-exception.filter';


async function bootstrap() {
  // 在应用启动前验证环境变量
  try {
    validateEnvironment();
  } catch (error) {
    console.log(`❌ 环境变量验证失败: ${error instanceof Error ? error.message : String(error)}`, {
      context: 'Bootstrap',
    });
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.flushLogs();
  // 注册全局异常过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 启用CORS，支持跨域cookie
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // 明确指定前端域名
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // 允许携带cookie
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 添加cookie解析中间件
  app.use(cookieParser());

  // 设置全局API前缀
  app.setGlobalPrefix("api");

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = appConfig.server.port;
  await app.listen(port);
  console.log('server is running on port', port);

}

bootstrap();
