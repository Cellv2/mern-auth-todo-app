export type User = {
    token: string | UserToken;
};

export type UserToken = {
    id: string;
    iat: number;
    exp: number;
};
