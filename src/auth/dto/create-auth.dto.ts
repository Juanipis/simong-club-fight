import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user.' })
  email: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @IsString()
  @MinLength(12)
  @MaxLength(50)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter, a number, and a special character',
  })
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
