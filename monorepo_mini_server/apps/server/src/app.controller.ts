import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";
import { AppService } from "./app.service";
import { Roles } from "./decorators/roles.decorator";

@Controller()
@Roles('Public')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(@Res() res: Response) {
    // 根路径直接返回前端页面
    const indexPath = path.join(__dirname, "..", "public", "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        res
          .status(404)
          .send("Frontend not built yet. Please run: npm run build:frontend");
      }
    });
  }

  @Get("health")
  getHello(): string {
    return this.appService.getHello();
  }
}
