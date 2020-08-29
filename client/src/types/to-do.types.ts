export type Item = {
    _id?: string;
    userid?: string;
    isComplete: boolean;
    isBeingEdited: boolean;
    text: string;
    timestamp: number;
};
