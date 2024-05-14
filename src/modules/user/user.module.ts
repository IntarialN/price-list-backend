import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import {UserController} from "@modules/user/user.controller";
import {EUser} from "@config/db/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EUser])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
