import { AvailableThemes } from "./theme.types";

export type ApplicationState = {
    isAuthenticated: boolean;
    user: User | null;
    theme: AvailableThemes;
    items: Item[];
    username: string | null;
};

export type User = {
    token: string | UserToken;
};

export type UserToken = {
    id: string;
    iat: number;
    exp: number;
};

export type Item = {
    _id?: string;
    userid?: string;
    isComplete: boolean;
    text: string;
    timestamp: number;
};
