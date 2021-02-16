import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserData, PublicUser } from 'src/types';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async createUser(user: CreateUserData): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  public async getUserById(id: number): Promise<PublicUser> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    return user;
  }
}
