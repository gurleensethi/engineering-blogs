import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GitHubLoginDto } from './dto/github-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/github')
  public async loginWithGithub(@Body() gitHubLoginDto: GitHubLoginDto) {
    return this.authService.loginWithGitHub(gitHubLoginDto);
  }
}
