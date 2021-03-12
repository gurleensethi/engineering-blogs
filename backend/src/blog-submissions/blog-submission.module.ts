import { Module } from '@nestjs/common';
import { BlogSubmissionController } from './blog-submission.controller';
import { BlogSubmissionService } from './blog-submission.service';

@Module({
  imports: [],
  controllers: [BlogSubmissionController],
  providers: [BlogSubmissionService],
  exports: [BlogSubmissionService],
})
export class BlogSubmissionModule {}
