import { ApplicationState } from "../types/application-state-types";
import { StateAction } from "../types/state-action-types";

export const updateUserActions = {
    SET_USER: "SET_USER",
};

export const updateUser = (
    state: ApplicationState,
    action: StateAction
): ApplicationState => {
    const { user } = state;

    console.log("123123123asdasdasd");
    console.log(action.type);

    switch (action.type) {
        case updateUserActions.SET_USER:
            console.log("SET_USER action from the switch");
            return state;
    }

    return state;
};
