import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(5, 10)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(6, 12)
  password?: string;

  @IsString()
  @Length(5, 10)
  name?: string;

  @IsString()
  @Length(5, 10)
  email?: string;
}
