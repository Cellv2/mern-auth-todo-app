import React from "react";

import ToDoItem from "./ToDoItem";
import ToDoCreate from "./ToDoCreate";

import { Item } from "../../types/to-do-types";

type Props = {
    items?: Item[];
    handleCreateOnClick: (inText: string) => void;
    handleIsCompleteChange: (index: number) => void;
    handleDeleteOnClick: (index: number) => void;
};

const ToDoForm: React.FunctionComponent<Props> = (props: Props) => {
    const { items, handleCreateOnClick, handleIsCompleteChange, handleDeleteOnClick } = props;

    let toDoItems: JSX.Element | JSX.Element[];
    if (items && items.length > 0) {
        toDoItems = items.map((item, index) => {
            return (
                <ToDoItem
                    key={index}
                    index={index}
                    item={item}
                    handleIsCompleteChange={handleIsCompleteChange}
                    handleDeleteOnClick={handleDeleteOnClick}
                />
            );
        });
    } else {
        toDoItems = <div>There are no items</div>;
    }

    return (
        <div>
            <p>There should probably be a header here or something</p>
            <ToDoCreate handleCreateOnClick={handleCreateOnClick} />
            {toDoItems}
        </div>
    );
};

export default ToDoForm;
