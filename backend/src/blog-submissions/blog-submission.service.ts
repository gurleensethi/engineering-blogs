import { BadRequestException, Injectable } from '@nestjs/common';
import { BlogSubmission, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BlogSubmissionService {
  constructor(private prismaService: PrismaService) {}

  public async getAllSubmissions(): Promise<BlogSubmission[]> {
    return this.prismaService.blogSubmission.findMany();
  }

  public async createSubmission(
    user: User,
    data: Prisma.BlogSubmissionCreateWithoutUserInput,
  ): Promise<void> {
    const submission = await this.prismaService.blogSubmission.findMany({
      where: { userId: user.id },
    });

    if (submission.length >= 5) {
      throw new BadRequestException(
        '5 submission already made. Please wait for them to be approved before submitting more.',
      );
    }

    await this.prismaService.blogSubmission.create({
      data: { ...data, user: { connect: { id: user.id } } },
    });
  }

  public async deleteSubmission(id: number): Promise<void> {
    await this.prismaService.blogSubmission.delete({ where: { id } });
  }

  public async getSubmissionsForUser(
    userId: number,
  ): Promise<BlogSubmission[]> {
    return this.prismaService.blogSubmission.findMany({
      where: { user: { id: userId } },
    });
  }
}
