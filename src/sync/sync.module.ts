import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { SyncService } from './sync.service';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
