import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PaginatedResult } from 'src/types';
import { CreatePostDto } from './dto/create-post.dto';

const POST_PAGE_SIZE = 20;

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  public async getPosts(
    pageNumber: number,
    publicationIds?: string,
    search?: string,
  ): Promise<PaginatedResult<Post>> {
    const itemsToSkip = pageNumber * POST_PAGE_SIZE;

    const queryOptions: Prisma.PostFindManyArgs = {
      skip: itemsToSkip,
      take: POST_PAGE_SIZE,
      orderBy: {
        pubDate: 'desc',
      },
      include: { publication: true },
    };

    if (publicationIds) {
      queryOptions.where = {
        publicationId: {
          in: publicationIds.split(','),
        },
      };
    }

    if (search) {
      queryOptions.where = {
        ...queryOptions.where,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          {
            publication: {
              blogName: { contains: search, mode: 'insensitive' },
            },
          },
          { publication: { name: { contains: search, mode: 'insensitive' } } },
          {
            publication: {
              description: { contains: search, mode: 'insensitive' },
            },
          },
        ],
      };
    }

    const results = await this.prismaService.post.findMany(queryOptions);

    return {
      pageNumber,
      hasNextPage: results.length >= POST_PAGE_SIZE,
      data: results,
    };
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

  public async createManyPosts(posts: Prisma.PostUpdateInput[]): Promise<void> {
    await this.prismaService.$transaction(
      posts.map((post) => {
        return this.prismaService.post.upsert({
          create: post as Post,
          update: post,
          where: { postId: post.postId as string },
        });
      }),
    );
  }

  public async getPostsWithoutImages(): Promise<Post[]> {
    return this.prismaService.post.findMany({ where: { imageUrl: null } });
  }

  public async updatePostImages(
    posts: { postId: string; imageUrl: string | null }[],
  ): Promise<void> {
    await this.prismaService.$transaction(
      posts.map(({ postId, imageUrl }) =>
        this.prismaService.post.update({
          where: { postId: postId },
          data: { imageUrl: imageUrl },
        }),
      ),
    );
  }
}
