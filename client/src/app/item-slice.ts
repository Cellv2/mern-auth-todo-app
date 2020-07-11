import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

import { Item } from "../types/to-do.types";
import {
    getItemsFromDatabase,
    addItemsToDatabase,
    deleteItemFromDatabase,
} from "../api/item.api";

export interface ItemState {
    pristineItems: Item[];
    dirtyItems: Item[];
    error: string | null;
}

export const initialState: ItemState = {
    pristineItems: [],
    dirtyItems: [],
    error: null,
};

export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        getItemsSuccess: (state, action: PayloadAction<Item[]>) => {
            // as these items come from the DB, they must have _id attached (are pristine items)
            state.pristineItems = action.payload;
            state.error = null;
        },
        getItemsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        addItemsSuccess: (state, action: PayloadAction<Item[] | Item>) => {
            if (Array.isArray(action.payload)) {
                const items = action.payload;

                const pristine = items.filter((item) => item._id !== undefined);
                const pristineConcat = [...state.pristineItems, ...pristine];
                state.pristineItems = filterDuplicateItemsById(pristineConcat);

                const dirty = items.filter((item) => item._id === undefined);
                const dirtyConcat = [...state.dirtyItems, ...dirty];
                state.dirtyItems = filterDuplicateItemsByTimestamp(dirtyConcat);
            } else {
                const item = action.payload;
                if (item._id !== undefined) {
                    const pristine = [...state.pristineItems, item];
                    state.pristineItems = filterDuplicateItemsById(pristine);
                } else {
                    const dirty = [...state.dirtyItems, item];
                    state.dirtyItems = filterDuplicateItemsByTimestamp(dirty);
                }
            }

            state.error = null;
        },
        addItemsFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        /** INTERNAL - use deleteItemAsync instead */
        deleteItemSuccess: (state, action: PayloadAction<Item>) => {
            const item = action.payload;
            // it must be an saved item if _id is present
            if (item._id !== undefined) {
                state.pristineItems = state.pristineItems.filter(
                    (pristineItem) => pristineItem._id !== item._id
                );
            } else {
                state.dirtyItems = state.dirtyItems.filter(
                    (dirtyItem) => dirtyItem.timestamp !== item.timestamp
                );
            }

            state.error = null;
        },
        /** INTERNAL - use deleteItemAsync instead */
        deleteItemFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

// not exported because they are used internally for async actions
const {
    getItemsSuccess,
    getItemsFailure,
    addItemsSuccess,
    addItemsFailed,
    deleteItemSuccess,
    deleteItemFailed,
} = itemSlice.actions;

export const getItemsAsync = (): AppThunk => async (dispatch, getState) => {
    const userIsAuthenticated = getState().user.isAuthenticated;
    const userToken = getState().user.token;
    if (userIsAuthenticated && userToken !== null) {
        try {
            const items = await getItemsFromDatabase(userToken);
            dispatch(getItemsSuccess(items));
        } catch (err) {
            dispatch(getItemsFailure(err));
        }
    }
};

/**
 * @param {Item[]} items Array of items to add to DB / state
 */
export const addItemsAsync = (items: Item[] | Item): AppThunk => async (
    dispatch,
    getState
) => {
    const userIsAuthenticated = getState().user.isAuthenticated;
    const userToken = getState().user.token;
    if (userIsAuthenticated && userToken !== null) {
        try {
            const response = await addItemsToDatabase(items, userToken);
            console.log("ASYNC RESPONSE", response);
            dispatch(addItemsSuccess(response));
        } catch (err) {
            dispatch(addItemsFailed(err));
        }
    } else {
        dispatch(addItemsSuccess(items));
    }
};

export const deleteItemAsync = (item: Item): AppThunk => async (
    dispatch,
    getState
) => {
    const userIsAuthenticated = getState().user.isAuthenticated;
    const userToken = getState().user.token;
    if (userIsAuthenticated && userToken !== null && item._id !== undefined) {
        try {
            await deleteItemFromDatabase(item, userToken);
            dispatch(deleteItemSuccess(item));
        } catch (err) {
            dispatch(deleteItemFailed(err));
        }
    } else {
        dispatch(deleteItemSuccess(item));
    }
};

// includes both items saved into the DB and those not saved to the DB
export const itemsSelector = (state: RootState) => [
    ...state.items.pristineItems,
    ...state.items.dirtyItems,
];

// only includes items which are saved into the database (have _id on the item object)
export const pristineItemsSelector = (state: RootState) =>
    state.items.pristineItems;

// only includes items which are saved not saved into the database (do not have _id on the item object)
export const dirtyItemsSelector = (state: RootState) => state.items.dirtyItems;

const filterDuplicateItemsById = (items: Item[]) => {
    const distinctItems = items.filter(
        (item, index, arr) =>
            arr.findIndex((arrItem) => arrItem._id === item._id) === index
    );

    return distinctItems;
};

const filterDuplicateItemsByTimestamp = (items: Item[]) => {
    const distinctItems = items.filter(
        (item, index, arr) =>
            arr.findIndex((arrItem) => arrItem.timestamp === item.timestamp) ===
            index
    );

    return distinctItems;
};

export default itemSlice.reducer;
