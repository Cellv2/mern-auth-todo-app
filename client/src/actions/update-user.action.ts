import { ApplicationState } from "../types/application-state-types";
import { StateAction } from "../types/state-action-types";

export const updateUserActions = {
    SET_USER: "SET_USER",
};

/**
 * Function to merge state into the payload and return new state for users
 * @param {ApplicationState} state The current state to be updated and returned
 * @param {StateAction} action Type: the update type to be performed, Payload: The state key:val to be merged into state
 */
export const updateUser = (
    state: ApplicationState,
    action: StateAction
): ApplicationState => {
    switch (action.type) {
        case updateUserActions.SET_USER:
            let newState = state;
            newState.user = action.payload.user;

            return newState;

        default:
            return state;
    }
};
