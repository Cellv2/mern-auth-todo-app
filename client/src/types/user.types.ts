import { AvailableThemes } from "./theme.types";

export type UserPartial = Partial<User>;

export interface User {
    isAuthenticated: boolean;
    theme: AvailableThemes;
    username: string | null;
    token: string | null;
}

export type UserToken = {
    id: string;
    iat: number;
    exp: number;
};
