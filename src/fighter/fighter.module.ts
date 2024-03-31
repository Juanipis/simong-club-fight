import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterController } from './fighter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { PassportModule } from '@nestjs/passport';
import { SpecialModule } from './special/special.module';
@Module({
  controllers: [FighterController],
  providers: [FighterService],
  imports: [
    TypeOrmModule.forFeature([Fighter]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SpecialModule,
  ],
})
export class FighterModule {}
