export type User = {
    _id?: string;
    balance: number;
    email?: string;
    password?: string;
}

export type UserRequest = {
    email: string;
    password: string;
}

export type UserResponse = {
    user: User;
    accessToken: string;
    refreshToken: string
}