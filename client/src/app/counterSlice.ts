import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        updateByAmount: (state, payload: PayloadAction<number>) => {
            state.count += payload.payload;
        },
    },
});

export const updateByAmountAsync = (amount: number): AppThunk => (
    dispatch
) => {
    setTimeout(() => {
        dispatch(updateByAmount(amount));
    }, 1000);
};

export const { decrement, increment, updateByAmount } = counterSlice.actions;

export const countSelector = (state: RootState) => state.counter.count;

export default counterSlice.reducer;
