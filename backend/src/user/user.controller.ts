import { Controller, Get } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  public async getUser(@AuthUser() user: User) {
    return this.userService.getUserById(user.id);
  }
}
