import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetPostsQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page = 0;

  @IsOptional()
  @IsString()
  publicationIds: string;

  @IsOptional()
  @IsString()
  search?: string;
}
