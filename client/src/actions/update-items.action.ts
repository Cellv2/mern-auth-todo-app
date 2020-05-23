import { ApplicationState } from "../types/application-state.types";
import { StateAction } from "../types/state-action.types";

// TODO: Separate these out so they are not all just under 'set items'
export const updateItemsActions = {
    // ADD_ITEM: "ADD_ITEM",
    // DELETE_ITEM: "DELETE_ITEM",
    SET_ITEMS: "SET_ITEMS",
};

export const updateItems = (state: ApplicationState, action: StateAction) => {
    switch (action.type) {
        case updateItemsActions.SET_ITEMS: {
            let newState = state;
            newState.items = action.payload.items;

            return newState;
        }

        default:
            return state;
    }
};
