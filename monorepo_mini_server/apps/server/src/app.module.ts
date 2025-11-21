import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { JwtModule } from "@nestjs/jwt";
import * as path from "path";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./module/health/health.module";
import { GlobalAuthGuard } from "./guards/global-auth.guard";
import { RequestTimeoutMiddleware } from "./middleware/request-timeout.middleware";
import { PrismaModule } from "./database/prisma.module";

@Module({
  imports: [
    // 配置静态文件托管
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "public"),
      exclude: ["/api*"], // 排除API路由
      serveRoot: "/", // 从根路径服务静态文件
    }),
    // 添加 JwtModule 以支持 GlobalAuthGuard
    JwtModule.register({
      secret: process.env.JWT_SECRET || "",
      signOptions: { expiresIn: "14d" },
    }),

    HealthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestTimeoutMiddleware)
      .forRoutes('*'); // 应用到所有路由
  }
}
