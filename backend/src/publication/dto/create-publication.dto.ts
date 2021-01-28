import { IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  blogName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  link: string;
}
