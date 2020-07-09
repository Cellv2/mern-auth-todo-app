import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

import { Item } from "../types/to-do.types";

export interface ItemState {
    pristineItems: Item[];
    dirtyItems: Item[];
}

export const initialState: ItemState = {
    pristineItems: [],
    dirtyItems: [],
};

export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<Item[] | Item>) => {
            console.log("addItems payload: ", action.payload);
            if (Array.isArray(action.payload)) {
                const itemArr = action.payload;
                const pristine = itemArr.filter((item) => "_id" in item);
                const pristineConcat = [...state.pristineItems, ...pristine];
                state.pristineItems = filterDuplicateItemsById(pristineConcat);

                const dirty = itemArr.filter((item) => !("_id" in item));
                const dirtyConcat = [...state.dirtyItems, ...dirty];
                state.dirtyItems = filterDuplicateItemsByTimestamp(dirtyConcat);
            } else {
                const item = action.payload;
                if (item._id !== undefined) {
                    const pristineConcat = [...state.pristineItems, item];
                    state.pristineItems = filterDuplicateItemsById(
                        pristineConcat
                    );
                } else {
                    const dirtyConcat = [...state.dirtyItems, item];
                    state.dirtyItems = filterDuplicateItemsByTimestamp(
                        dirtyConcat
                    );
                }
            }
        },
        deleteItem: (state, action: PayloadAction<Item>) => {
            const item = action.payload;
            // it must be an unsaved item if there is no _id
            if (!("_id" in item)) {
                console.log("yoooo");
                state.dirtyItems = state.dirtyItems.filter(
                    (dirtyItem) => dirtyItem.timestamp !== item.timestamp
                );
            }
        },
    },
});

export const { addItems, deleteItem } = itemSlice.actions;

// includes both items saved into the DB and those not saved to the DB
export const itemsSelector = (state: RootState) => [
    ...state.items.pristineItems,
    ...state.items.dirtyItems,
];

// only inclused items which are saved into the database (have _id on the item object)
export const pristineItemsSelector = (state: RootState) =>
    state.items.pristineItems;

// only inclused items which are saved not saved into the database (do not have _id on the item object)
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
