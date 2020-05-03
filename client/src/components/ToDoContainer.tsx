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
            { isComplete: true, text: "Item 1" },
            { isComplete: false, text: "Item 2" },
            { isComplete: false, text: "Item 3" },
        ],
    };

    async componentDidMount() {
        // TODO: Make sure this has authentication around it
        const fetchUserTodos = await fetch(`/api/users/todos`);
        const userTodos: {
            author: string;
            isComplete: boolean;
            text: string;
        }[] = await fetchUserTodos.json();

        if (userTodos.length) {
            const todosToItems: Item[] = userTodos.map((todo) => {
                const item = {
                    isComplete: todo.isComplete,
                    text: todo.text,
                } as Item;
                return item;
            });

            const stateItems = this.state.items ?? [];
            const newItems = [...stateItems, ...todosToItems];

            this.setState((prevState: State) => ({
                ...prevState,
                items: newItems,
            }));
        }

        return;
    }

    handleCreateOnClick = (inText: string): void => {
        const newItem: Item = {
            isComplete: false,
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
        tempItems[index].isComplete = !tempItems[index].isComplete;

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
