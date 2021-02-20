import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { AddPublicationDto } from './dto/add-publication.dto';
import { RemovePublicationDto } from './dto/remove-publication';
import { UserPublicationService } from './user-publication.service';

@Controller('users/publications')
export class UserPublicationController {
  constructor(private userPublicationService: UserPublicationService) {}

  @Get()
  public async getPublications(@AuthUser() user: User) {
    return this.userPublicationService.getPublications(user.id);
  }

  @Put()
  public async addPublication(
    @AuthUser() user: User,
    @Body() addPublicationDto: AddPublicationDto,
  ) {
    return this.userPublicationService.addPublication(
      user.id,
      addPublicationDto.publicationId,
    );
  }

  @Delete()
  public async removePublication(
    @AuthUser() user: User,
    @Body() removePublicationDto: RemovePublicationDto,
  ) {
    return this.userPublicationService.removePulication(
      user.id,
      removePublicationDto.publicationId,
    );
  }
}
