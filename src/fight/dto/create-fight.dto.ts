import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IsEqual } from '../decorators/IsEqual.decorator';

export class CreateFightDto {
  @IsUUID()
  @ApiProperty({ description: 'The id of the first fighter' })
  fighter1_id: string;

  @IsUUID()
  @IsEqual('fighter1_id', {
    message: 'fighter1_id and fighter2_id cannot be the same',
  })
  @ApiProperty({ description: 'The id of the second fighter' })
  fighter2_id: string;
}
