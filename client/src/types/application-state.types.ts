import { JwtHeader } from "jsonwebtoken";

export type ApplicationState = {
    isAuthenticated: boolean;
    user: User | null;
    theme: string;
};

export type User = {
    username: string;
    token: string | UserToken;
};

export type UserToken = {
    id: string;
    username: string;
    iat: number;
    exp: number;
};
