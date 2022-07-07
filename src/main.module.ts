import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Environment, validate } from 'environment';
import { DatabaseModule } from 'database';
import { AppModule } from 'app/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validate(config, Environment),
    }),
    DatabaseModule,
    AppModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
