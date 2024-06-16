import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(256)
  username: string;
}
