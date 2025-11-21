import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "MDX Preview Backend API is running!";
  }
}
