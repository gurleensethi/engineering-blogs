import { Controller, Get } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorator/role.decorator';

@Controller('blog-submissions')
export class BlogSubmissionController {
  @Get()
  @Roles([UserRole.ADMIN])
  public async getAllSubmission() {}
}
