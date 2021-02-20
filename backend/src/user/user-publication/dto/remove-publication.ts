import { IsString } from 'class-validator';

export class RemovePublicationDto {
  @IsString()
  publicationId: string;
}
