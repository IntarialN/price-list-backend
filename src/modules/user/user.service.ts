import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {EUser} from "@config/db/entities/user.entity";
import {UserCreateErrorResponse, UserLoginResponse} from "@modules/user/typings";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(EUser)
        private repository: Repository<EUser>,
    ) {}

    async findByUsername(username: string): Promise<EUser | undefined> {
        return this.repository.findOne({ where: {username} });
    }

    async createUser(username: string, password: string): Promise<UserCreateErrorResponse | EUser> {
        const user = new EUser();

        const candidate = await this.repository.findOne({ where: { username } });

        if (candidate) {
            return { message: 'Пользователь с таким логином уже существует', id: candidate.id }
        }

        user.username = username;
        user.password = password;

        return this.repository.save(user);
    }

    async login(username: string, password: string): Promise<UserLoginResponse> {
        const candidate = await this.findByUsername(username);

        if (!candidate)
            return {
                message: 'Пользователь не найден', accessToken: null
            }

        if (candidate.password !== password)
            return {
                message: 'Неверный пароль', accessToken: null
            }

        const accessToken = 'token_intarial';

        return {
            accessToken,
            message: 'Успешная авторизация'
        };
    }
}