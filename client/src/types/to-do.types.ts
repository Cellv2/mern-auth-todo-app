export type Item = {
    _id?: string;
    userid?: string;
    isComplete: boolean;
    text: string;
};


// TODO: Is there a better way of doing this? At the moment we'd need to update the ItemUpdateTypes every time we want to add a new types
// To be used in conjunction with the ItemUpdates type
export type ItemUpdateTypes =
    | "DELETE_ITEM"
    | "SWITCH_IS_COMPLETE"
    | "UPDATE_TEXT";

export type ItemUpdates = ItemDelete | ItemUpdateComplete | ItemUpdateText;

export type ItemDelete = { type: "DELETE_ITEM"; index: number };

export type ItemUpdateComplete = {
    type: "SWITCH_IS_COMPLETE";
    index: number;
    payload: boolean;
};

export type ItemUpdateText = {
    type: "UPDATE_TEXT";
    index: number;
    payload: string;
};
