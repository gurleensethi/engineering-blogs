import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { BlogSubmissionService } from './blog-submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('blog-submissions')
export class BlogSubmissionController {
  constructor(private blogSubmissionService: BlogSubmissionService) {}

  @Get()
  @Roles([UserRole.ADMIN])
  public async getAllSubmission() {
    return this.blogSubmissionService.getAllSubmissions();
  }

  @Post()
  public async createSubmission(
    @AuthUser() user: User,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    return this.blogSubmissionService.createSubmission(
      user,
      createSubmissionDto,
    );
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  public async deleteSubmission(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.blogSubmissionService.deleteSubmission(id);
  }
}
