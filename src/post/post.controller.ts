import { Controller, Get } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  public async getAll(): Promise<Post[]> {
    return this.postService.getAll();
  }
}
