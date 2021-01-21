import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }
}
