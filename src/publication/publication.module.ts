import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
