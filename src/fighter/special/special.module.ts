import { Module } from '@nestjs/common';
import { SpecialService } from './special.service';
import { SpecialController } from './special.controller';
import { Special } from './entities/special.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [SpecialController],
  providers: [SpecialService],
  imports: [
    TypeOrmModule.forFeature([Special]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class SpecialModule {}
