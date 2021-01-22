import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  desceription: string | null;

  @IsNotEmpty()
  pubDate: Date;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  guid: string;

  @IsNotEmpty()
  publicationId: string;
}
