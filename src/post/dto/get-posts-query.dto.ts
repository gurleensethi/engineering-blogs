import { IsInt, IsNumberString, IsOptional } from 'class-validator';

export class GetPostsQueryDto {
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  page = 0;
}
