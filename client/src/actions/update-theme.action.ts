import { ApplicationState } from "../types/application-state-types";
import { StateAction } from "../types/state-action-types";

export const updateThemeActions = {
    SET_THEME: "SET_THEME",
};

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
