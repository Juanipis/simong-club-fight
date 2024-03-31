import { IsString, MinLength } from 'class-validator';

export class CreateSpecialDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;
}
