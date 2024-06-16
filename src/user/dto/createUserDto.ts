import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email address for a new user',
    type: String,
    example: 'john.doe456@example.com',
  })
  mail: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  @ApiProperty({
    description: 'Plain text password for a new user',
    type: String,
    minLength: 8,
    maxLength: 256,
    example: 'ZAQ!2wsx',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(256)
  @ApiProperty({
    description: 'Username for a new user',
    type: String,
    minLength: 4,
    maxLength: 256,
    example: 'JohnDoe',
  })
  username: string;
}
