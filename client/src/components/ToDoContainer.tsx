import React, { Component } from "react";

import ToDoForm from "./ToDoForm";

import { Item } from "../../types/to-do-types";

type Props = {};
type State = {
    items?: Item[];
};

class ToDoContainer extends React.Component<Props, State> {
    state: State = {
        items: [
            { isCompleted: true, text: "Item 1" },
            { isCompleted: false, text: "Item 2" },
            { isCompleted: false, text: "Item 3" },
        ],
    };

    handleCreateOnClick = (inText: string): void => {
        const newItem: Item = {
            isCompleted: false,
            text: inText,
        };

        let tempItems: Item[] = this.state.items ?? [];
        tempItems.push(newItem);

        this.setState((prevState: State) => ({
            ...prevState,
            items: tempItems,
        }));

        return;
    };

    handleIsCompleteChange = (index: number): void => {
        // there really must be items by this point else nothing would have been rendered and the button wouldn't show
        let tempItems: Item[] = this.state.items!;
        tempItems[index].isCompleted = !tempItems[index].isCompleted;

        this.setState((prevState: State) => ({
            ...prevState,
            items: tempItems,
        }));

        return;
    };

    handleDeleteOnClick = (index: number): void => {
        // there really must be items by this point else nothing would have been rendered and the button wouldn't show
        let tempItems: Item[] = this.state.items!;
        tempItems.splice(index, 1);

        this.setState((prevState: State) => ({
            ...prevState,
            items: tempItems,
        }));

        return;
    };

    render() {
        return (
            <div>
                This is the ToDoContainer
                <ToDoForm
                    items={this.state.items}
                    handleCreateOnClick={this.handleCreateOnClick}
                    handleIsCompleteChange={this.handleIsCompleteChange}
                    handleDeleteOnClick={this.handleDeleteOnClick}
                />
            </div>
        );
    }
}

export default ToDoContainer;
