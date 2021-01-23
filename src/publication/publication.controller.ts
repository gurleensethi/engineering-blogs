import { Controller, Get } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PublicationService } from './publication.service';

@Controller('publications')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Get()
  public async getAllPublications(): Promise<Publication[]> {
    return this.publicationService.getAllPublications();
  }
}
