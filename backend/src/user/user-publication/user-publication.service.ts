import { Injectable } from '@nestjs/common';
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

  public async addPublication(
    userId: number,
    publicationId: string,
  ): Promise<void> {
    const existingEntry = await this.prismaService.userPublication.findFirst({
      where: { userId, publicationId },
    });

    if (existingEntry) {
      return;
    }

    await this.prismaService.userPublication.create({
      data: { userId, publicationId },
    });
  }

  public async removePulication(
    userId: number,
    publicationId: string,
  ): Promise<void> {
    const existingEntry = await this.prismaService.userPublication.findFirst({
      where: { userId, publicationId },
    });

    if (!existingEntry) {
      return;
    }

    await this.prismaService.userPublication.delete({
      where: { userId_publicationId: { userId, publicationId } },
    });
  }
}
