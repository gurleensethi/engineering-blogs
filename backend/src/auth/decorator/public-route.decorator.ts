import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_KEY = 'public_route';

export const PublicRoute = (): CustomDecorator =>
  SetMetadata(PUBLIC_ROUTE_KEY, true);
