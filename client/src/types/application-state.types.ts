import { AvailableThemes } from "./theme.types";
import { Item } from "./to-do.types";

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
