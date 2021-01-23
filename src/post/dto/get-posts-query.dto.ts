import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetPostsQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page = 0;
}
