import { ApplicationState } from "../types/application-state-types";
import { StateAction } from "../types/state-action-types";

export const updateThemeActions = {
    SET_THEME: "SET_THEME",
};

/**
 * Function to merge state into the payload and return new state for themes
 * @param {ApplicationState} state The current state to be updated and returned
 * @param {StateAction} action Type: the update type to be performed, Payload: The state key:val to be merged into state
 */
export const updateTheme = (state: ApplicationState, action: StateAction) => {
    switch (action.type) {
        case updateThemeActions.SET_THEME:
            let newState = state;
            newState.theme = action.payload.theme;

            return newState;

        default:
            return state;
    }
};
