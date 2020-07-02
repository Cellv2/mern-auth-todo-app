import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    countSelector,
    decrement,
    increment,
    updateByAmount,
    updateByAmountAsync,
} from "./counterSlice";

interface Props {}

const Counter = (props: Props) => {
    const count = useSelector(countSelector);
    const dispatch = useDispatch();
    // string to allow negative numbers
    const [incrementAmount, setIncrementAmount] = useState<string>("0");

    return (
        <div>
            <p>The current count is: {count}</p>
            <button onClick={() => dispatch(increment())}>
                Change State: +1
            </button>
            <button onClick={() => dispatch(decrement())}>
                Change State: -1
            </button>
            <hr />
            <p>
                If you click the button, you will update the state by{" "}
                {incrementAmount}
            </p>
            <input
                type="text"
                placeholder="How much to update the state by?"
                onChange={(e) => setIncrementAmount(e.currentTarget.value)}
                value={incrementAmount}
            />
            <button
                onClick={() =>
                    dispatch(updateByAmount(Number(incrementAmount)))
                }
            >
                Clicky!
            </button>
            <hr />
            <button
                onClick={() =>
                    dispatch(updateByAmountAsync(Number(incrementAmount)))
                }
            >
                Click for async update
            </button>
        </div>
    );
};

export default Counter;
