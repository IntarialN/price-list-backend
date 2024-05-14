import {EUser} from "@config/db/entities/user.entity";

export interface UserLoginResponse {
    message: string;
    accessToken: string;
}

export interface UserCreateErrorResponse {
    id: number;
    message: string;
}