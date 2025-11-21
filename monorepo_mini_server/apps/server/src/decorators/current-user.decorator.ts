import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '@packages/types';

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
); 