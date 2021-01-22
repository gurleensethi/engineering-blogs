import { BadRequestException, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const existingPost = await this.prismaService.post.findUnique({
      where: { guid: createPostDto.guid },
    });

    if (existingPost) {
      throw new BadRequestException(
        `Post '${createPostDto.guid}' already exists.`,
      );
    }

    return this.prismaService.post.create({ data: createPostDto });
  }
}
