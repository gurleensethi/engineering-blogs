import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (_data: any, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.user as User;
  },
);
