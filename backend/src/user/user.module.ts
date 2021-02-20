import { Module } from '@nestjs/common';
import { UserPublicationModule } from './user-publication/user-publicaton.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserPublicationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
