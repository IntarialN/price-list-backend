import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DBConfig} from "@config/db";
import {ItemModule} from "@modules/item/item.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}