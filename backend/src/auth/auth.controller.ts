import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from './decorator/public-route.decorator';
import { GitHubLoginDto } from './dto/github-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/github')
  @PublicRoute()
  public async loginWithGithub(@Body() gitHubLoginDto: GitHubLoginDto) {
    return this.authService.loginWithGitHub(gitHubLoginDto);
  }
}
