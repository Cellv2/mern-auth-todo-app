import React from "react";

import styles from "./ToDoItem.module.scss";

import { Item } from "../../types/to-do-types";

type Props = {
    item: Item;
    index: number;
    handleDeleteOnClick: (index: number) => void;
};

const ToDoItem: React.FunctionComponent<Props> = (props: Props) => {
    const { item, index, handleDeleteOnClick } = props;
    return (
        <div>
            <span className={item.isCompleted ? styles.complete : ""}>
                {item.text}
            </span>
            <button onClick={() => handleDeleteOnClick(index)}>
                Click this to delete
            </button>
        </div>
    );
};

export default ToDoItem;
