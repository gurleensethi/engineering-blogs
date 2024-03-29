import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { PUBLIC_ROUTE_KEY } from '../decorator/public-route.decorator';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const tokenPayload = await this.authService.authenticateUserWithToken(
      authHeader,
    );

    if (!tokenPayload) {
      return false;
    }

    const user = await this.userService.getUserById(tokenPayload.id);

    if (!user) {
      return false;
    }

    const roles: UserRole[] = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (roles && roles.indexOf(user.role) === -1) {
      return false;
    }

    req.user = user;

    return true;
  }
}
