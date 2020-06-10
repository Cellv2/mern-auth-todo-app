import React from "react";

import ToDoItem from "./ToDoItem";
import ToDoCreate from "./ToDoCreate";

import { Item } from "../../types/to-do.types";

type Props = {
    items?: Item[];
    isAuthenticated: boolean;
    handleCreateOnClick: (inText: string) => void;
    handleDeleteOnClick: (index: number) => void;
    handleItemUpdate: (item: Item, index: number) => void;
};

const ToDoForm = (props: Props) => {
    const {
        items,
        isAuthenticated,
        handleCreateOnClick,
        handleDeleteOnClick,
        handleItemUpdate,
    } = props;

    let toDoItems: JSX.Element | JSX.Element[];
    if (items && items.length > 0) {
        // sort by timestamp in order to show the most recently created items at the top of the list
        const timestampSortedItems = items.sort(
            (a, b) => b.timestamp - a.timestamp
        );

        toDoItems = timestampSortedItems.map((item: Item, index: number) => {
            return (
                <ToDoItem
                    key={index}
                    index={index}
                    item={item}
                    isAuthenticated={isAuthenticated}
                    handleDeleteOnClick={handleDeleteOnClick}
                    handleItemUpdate={handleItemUpdate}
                />
            );
        });
    } else {
        toDoItems = <div>There are no items</div>;
    }

    return (
        <div>
            <p>There should probably be a header here or something</p>
            {!isAuthenticated && (
                <p>
                    You are not signed in! You will lose your items if you leave
                    the page
                </p>
            )}
            <ToDoCreate handleCreateOnClick={handleCreateOnClick} />
            {toDoItems}
        </div>
    );
};

export default ToDoForm;
