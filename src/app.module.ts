import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterModule } from './fighter/fighter.module';
import { AuthModule } from './auth/auth.module';
import { FightModule } from './fight/fight.module';
import { SpecialModule } from './special/special.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.POSTGRES_SSL === 'true',
      autoLoadEntities: true,
    }),
    FighterModule,
    AuthModule,
    FightModule,
    SpecialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
