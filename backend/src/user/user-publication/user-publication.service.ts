import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserPublicationService {
  constructor(private prismaService: PrismaService) {}

  public async getPublications(userId: number): Promise<Publication[]> {
    return this.prismaService.userPublication
      .findMany({
        where: { userId },
        include: { publication: true },
      })
      .then((data) => data.map((item) => item.publication));
  }
}
