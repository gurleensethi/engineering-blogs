import { Body, Controller, Post } from '@nestjs/common';
import { GitHubLoginDto } from './dto/github-login.dto';

@Controller('auth')
export class AuthController {
  @Post('login/github')
  public async loginWithGithub(@Body() gitHubLoginDto: GitHubLoginDto) {}
}
