import { Controller, Get, Query } from '@nestjs/common';
import { Post, User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { PublicRoute } from 'src/auth/decorator/public-route.decorator';
import { PaginatedResult } from 'src/types';
import { GetFeedQueryDto } from './dto/get-feed-query.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @PublicRoute()
  public async getAll(
    @Query() query: GetPostsQueryDto,
  ): Promise<PaginatedResult<Post>> {
    return this.postService.getPosts(
      query.page,
      query.publicationIds,
      query.search,
    );
  }

  @Get('feed')
  public async getMyFeed(
    @Query() query: GetFeedQueryDto,
    @AuthUser()
    user: User,
  ): Promise<PaginatedResult<Post>> {
    return this.postService.getMyFeedPosts(user, query.page);
  }
}
