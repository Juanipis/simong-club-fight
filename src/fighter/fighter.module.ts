import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterController } from './fighter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { PassportModule } from '@nestjs/passport';
import { Special } from 'src/special/entities/special.entity';
@Module({
  controllers: [FighterController],
  providers: [FighterService],
  imports: [
    TypeOrmModule.forFeature([Fighter, Special]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class FighterModule {}
