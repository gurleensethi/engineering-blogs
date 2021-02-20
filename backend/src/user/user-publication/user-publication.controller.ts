import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { UserPublicationService } from './user-publication.service';

@Controller('users/publications')
export class UserPublicationController {
  constructor(private userPublicationService: UserPublicationService) {}

  @Get()
  public async getPublications(@AuthUser() user: User) {
    return this.userPublicationService.getPublications(user.id);
  }
}
