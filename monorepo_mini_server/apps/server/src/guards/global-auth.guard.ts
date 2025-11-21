import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma.service";
import { ICurrentUser } from "@packages/types";

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService, // 添加 PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查是否有Public装饰器
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果标记为Public，直接通过
    if (requiredRoles && requiredRoles.includes('Public')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('lack of token');
    }

    try {
      // 验证JWT token
      const payload = this.jwtService.verify(token);
      // 从数据库获取最新的用户信息
      const currentUser = await this.prisma.user.findUnique({
        where: { id: payload.userId , deletedAt: undefined},
        select: {
          id: true,
          username: true,
          role: true,
          email: true,
          updatedAt: true,
        }
      });

      if (!currentUser) {
        throw new UnauthorizedException('user does not exist');
      }

      const iCurrentUser: ICurrentUser = {
        userId: currentUser.id,
        username: currentUser.username,
        role: currentUser.role,
      }

      // 将最新的用户信息附加到请求对象上
      request.user = iCurrentUser

      // 如果有角色要求，验证用户角色
      if (requiredRoles && requiredRoles.length > 0) {
        const userRole = currentUser.role;
        if (!userRole || !requiredRoles.includes(userRole)) {
          throw new ForbiddenException('no permission');
        }
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('无效的访问令牌');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    // 从httpOnly cookie中获取token
    const cookieToken = request.cookies?.token;
    if (cookieToken) {
      return cookieToken;
    }
    
    // 如果cookie中没有token，返回undefined
    return undefined;
  }
} 