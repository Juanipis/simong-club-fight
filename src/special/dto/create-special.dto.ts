import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSpecialDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ description: 'The name of the special' })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ description: 'The description of the special' })
  description: string;
}
