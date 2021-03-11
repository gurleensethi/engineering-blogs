import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  blogName: string;

  @IsUrl()
  @IsNotEmpty()
  blogUrl: string;
}
