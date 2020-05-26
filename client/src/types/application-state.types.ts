import { JwtHeader } from "jsonwebtoken";
import { AvailableThemes } from "./theme.types";

export type ApplicationState = {
    isAuthenticated: boolean;
    user: User | null;
    theme: AvailableThemes;
    items: Item[];
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

export type Item = {
    _id?: string;
    userid?: string;
    isComplete: boolean;
    text: string;
};
