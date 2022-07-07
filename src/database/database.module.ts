import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from 'environment';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get(ENV.DB_URI),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
