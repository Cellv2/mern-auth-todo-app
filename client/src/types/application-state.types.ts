export type ApplicationState = {
    isAuthenticated: boolean;
    user: User;
    theme: string;
};

export type User = {
    username: string;
    token: string;
};
