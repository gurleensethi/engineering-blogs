import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Roles = (roles: UserRole[]): CustomDecorator => {
  return SetMetadata(ROLES_KEY, roles);
};
