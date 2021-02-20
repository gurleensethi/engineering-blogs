import { Module } from '@nestjs/common';
import { UserPublicationController } from './user-publication.controller';
import { UserPublicationService } from './user-publication.service';

@Module({
  imports: [],
  controllers: [UserPublicationController],
  providers: [UserPublicationService],
  exports: [UserPublicationService],
})
export class UserPublicationModule {}
