import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { PublicationModule } from 'src/publication/publication.module';
import { SyncService } from './sync.service';

@Module({
  imports: [PostModule, PublicationModule],
  controllers: [],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
