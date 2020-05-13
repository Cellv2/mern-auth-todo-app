export type StateAction = {
    type: string;
    payload: any;
};

// TODO: I don't think this belongs here really? Not sure
export type UpdateStateActions = "updateUserState" | "Test";
