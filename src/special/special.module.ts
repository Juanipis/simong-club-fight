import { Module } from '@nestjs/common';
import { SpecialService } from './special.service';
import { SpecialController } from './special.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';
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
