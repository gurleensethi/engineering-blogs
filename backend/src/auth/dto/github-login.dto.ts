import { IsString } from 'class-validator';

export class GitHubLoginDto {
  @IsString()
  code: string;
}
