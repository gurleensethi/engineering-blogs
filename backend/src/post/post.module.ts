import { Module } from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostImageService],
  exports: [PostService, PostImageService],
})
export class PostModule {}
