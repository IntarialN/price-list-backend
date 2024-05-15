export interface UserLoginResponse {
    message: string;
    accessToken: string;
}

export interface UserCreateErrorResponse {
    id: number;
    message: string;
}