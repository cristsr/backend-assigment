import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Environment, validate } from 'environment';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validate(config, Environment),
    }),
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
