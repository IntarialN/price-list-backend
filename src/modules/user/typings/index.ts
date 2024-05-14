import {EUser} from "@config/db/entities/user.entity";

export interface UserLoginResponse {
    message: string;
    accessToken: string;
}