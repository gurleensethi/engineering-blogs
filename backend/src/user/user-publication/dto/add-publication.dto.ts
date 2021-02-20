import { IsString } from 'class-validator';

export class AddPublicationDto {
  @IsString()
  publicationId: string;
}
