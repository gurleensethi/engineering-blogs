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
      where: { postId: createPostDto.postId },
    });

    if (existingPost) {
      throw new BadRequestException(
        `Post '${createPostDto.guid}' already exists.`,
      );
    }

    return this.prismaService.post.create({ data: createPostDto });
  }

  public async createManyPosts(posts: Post[]): Promise<void> {
    await this.prismaService.$transaction(
      posts.map((post) => {
        return this.prismaService.post.upsert({
          create: post,
          update: post,
          where: { postId: post.postId },
        });
      }),
    );
  }
}
