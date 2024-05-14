import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DBConfig} from "@config/db";
import {ItemModule} from "@modules/item/item.module";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {UserModule} from "@modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig),
    ItemModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .exclude({ path: 'items', method: RequestMethod.GET })
        .forRoutes('*');
  }
}