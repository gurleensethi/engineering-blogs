import { Prisma, User } from '@prisma/client';

export interface PaginatedResult<T> {
  pageNumber: number;
  hasNextPage: boolean;
  data: T[];
}

export interface GitHubTokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export type CreateUserData = Prisma.UserCreateInput;

export interface GitHubUser {
  login: string;
  name: string;
  email: string;
}

export type PublicUser = Omit<User, 'createdAt' | 'accessToken'>;
