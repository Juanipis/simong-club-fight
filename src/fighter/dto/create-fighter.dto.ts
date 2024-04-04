import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateFighterDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ description: 'The name of the fighter' })
  name: string;

  @IsDate()
  @ApiProperty({
    description: 'The date of birth of the fighter',
    example: '2021-01-01',
  })
  date_of_birth: Date;

  @ApiProperty({ description: 'The country id of the fighter' })
  @IsNumber()
  @IsPositive()
  country_id: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The weight of the fighter', example: 60 })
  weight: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The height of the fighter', example: 1.2 })
  height: number;

  @IsString()
  @ApiProperty({ description: 'The biography of the fighter' })
  biography: string;

  @IsString()
  @ApiProperty({ description: 'The history of the fighter' })
  history: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The health of the fighter' })
  health: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The power of the fighter' })
  power: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The speed of the fighter' })
  speed: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  @ApiProperty({
    description: 'The luck of the fighter',
    minimum: 0,
    maximum: 1,
  })
  luck: number;

  @ApiProperty({ description: 'The date the fighter was created' })
  @IsDate()
  created_at: Date;

  @ApiProperty({ description: 'The status of the fighter' })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ description: 'The special ids uuids of the fighter' })
  @IsArray()
  @IsString({ each: true })
  special_ids: string[];
}
