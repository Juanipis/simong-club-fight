import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateFighterDto } from 'src/fighter/dto/create-fighter.dto';
import { Fighter } from 'src/fighter/entities/fighter.entity';
import { DeepPartial } from 'typeorm';

export class CreateSpecialDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fighter)
  fighters?: DeepPartial<Fighter[]>;
}
