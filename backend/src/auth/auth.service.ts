import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { GitHubTokenResponse, GitHubUser } from 'src/types';
import { UserService } from 'src/user/user.service';
import { GitHubLoginDto } from './dto/github-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async loginWithGitHub(githubLoginDto: GitHubLoginDto): Promise<any> {
    const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');

    const { data } = await axios.post<GitHubTokenResponse>(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: githubLoginDto.code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const { data: githubUserData } = await axios.get<GitHubUser>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${data.access_token}`,
        },
      },
    );

    let user = await this.userService.getUser(githubUserData.login);

    const nameSplits = githubUserData?.name?.split(' ');

    if (!user) {
      user = await this.userService.createUser({
        username: githubUserData.login,
        accessToken: data.access_token,
        firstName: nameSplits[0],
        lastName: nameSplits[1],
      });
    } else {
      await this.userService.updateUserToken(
        githubUserData.email,
        data.access_token,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return { accessToken };
  }
}
