
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {EUser} from "@config/db/entities/user.entity";
import {UserLoginResponse} from "@modules/user/typings";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<EUser> {
        return this.userService.createUser(username, password);
    }

    @Post('login')
    async loginUser(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<UserLoginResponse> {
        return  await this.userService.login(username, password);
    }
}