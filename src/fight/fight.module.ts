import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightController } from './fight.controller';
import { Fight } from './entities/fight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Fighter } from 'src/fighter/entities/fighter.entity';

@Module({
  controllers: [FightController],
  providers: [FightService],
  imports: [
    TypeOrmModule.forFeature([Fight, Fighter]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class FightModule {}
