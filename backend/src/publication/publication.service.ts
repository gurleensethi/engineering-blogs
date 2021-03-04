import { Injectable } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PublicationService {
  constructor(private prismaService: PrismaService) {}

  public async getAllPublications(): Promise<Publication[]> {
    return this.prismaService.publication.findMany({
      orderBy: { description: 'desc' },
    });
  }

  public async getPublication(id: string): Promise<Publication | undefined> {
    return this.prismaService.publication.findUnique({ where: { id } });
  }

  public async createPublication(
    publication: Publication,
  ): Promise<Publication> {
    return this.prismaService.publication.create({ data: publication });
  }
}
