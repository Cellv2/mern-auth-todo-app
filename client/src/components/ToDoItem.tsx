import React from "react";

import styles from "./ToDoItem.module.scss";

import { Item } from "../types/to-do.types";

type Props = {
    item: Item;
    index: number;
    handleIsCompleteChange: (index: number) => void;
    handleDeleteOnClick: (index: number) => void;
};

const ToDoItem = (props: Props) => {
    const { item, index, handleIsCompleteChange, handleDeleteOnClick } = props;
    return (
        <div>
            <input
                type="checkbox"
                name="isComplete"
                checked={item.isComplete}
                onChange={() => handleIsCompleteChange(index)}
            />
            <span className={item.isComplete ? styles.complete : ""}>
                {item.text}
            </span>
            <button onClick={() => handleDeleteOnClick(index)}>
                Click this to delete
            </button>
        </div>
    );
};

export default ToDoItem;
