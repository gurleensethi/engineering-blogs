import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserData } from 'src/types';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async createUser(user: CreateUserData): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  public async getUser(username: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { username } });
  }

  public async updateUserToken(
    username: string,
    accessToken: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: { username },
      data: { accessToken },
    });
  }
}
