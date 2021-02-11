import { Controller, Get } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PublicRoute } from 'src/auth/decorator/public-route.decorator';
import { PublicationService } from './publication.service';

@Controller('publications')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Get()
  @PublicRoute()
  public async getAllPublications(): Promise<Publication[]> {
    return this.publicationService.getAllPublications();
  }
}
