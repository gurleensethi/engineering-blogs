import { Controller, Get, Query } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PaginatedResult } from 'src/types';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  public async getAll(
    @Query() query: GetPostsQueryDto,
  ): Promise<PaginatedResult<Post>> {
    return this.postService.getPosts(query.page);
  }
}
