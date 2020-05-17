import React, { Component } from "react";

import ToDoForm from "./ToDoForm";
import ApiCallButton from "./ApiCallButton";

import { Item } from "../types/to-do.types";
import { ApplicationState } from "../types/application-state.types";
import { UpdateStateActions } from "../types/state-action.types";

import styles from "./Main.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};
type State = {
    items?: Item[];
};

class Main extends Component<Props, State> {
    state: State = {
        items: [
            { isComplete: true, text: "Item 1" },
            { isComplete: false, text: "Item 2" },
            { isComplete: false, text: "Item 3" },
        ],
    };

    async componentDidMount() {
        await this.handleGetAllUserTodos();

        return;
    }

    handleGetAllUserTodos = async (): Promise<void> => {
        // TODO: Make sure this has authentication around it
        const fetchUserTodos = await fetch(`/api/users/todos`);
        const userTodos: Item[] = await fetchUserTodos.json();

        if (userTodos.length) {
            const todoToItems: Item[] = userTodos.map((todo) => {
                const item: Item = {
                    _id: todo._id,
                    userid: todo.userid,
                    isComplete: todo.isComplete,
                    text: todo.text,
                };

                return item;
            });

            const stateItems = this.state.items ?? [];
            const newItems = [...stateItems, ...todoToItems];

            this.setState((prevState: State) => ({
                ...prevState,
                items: newItems,
            }));
        }

        return;
    };

    handleCreateOnClick = async (inText: string): Promise<void> => {
        const newItem = { isCompleted: false, text: inText };

        const response = await fetch(`/api/users/todos`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(newItem),
        });

        const createdItem: Item = await response.json();

        console.log(createdItem);

        const stateItems = this.state.items ?? [];
        const newItems = [...stateItems, createdItem];

        this.setState((prevState: State) => ({
            ...prevState,
            items: newItems,
        }));
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

    handleDeleteOnClick = async (index: number): Promise<void> => {
        // there really must be items by this point else nothing would have been rendered and the button wouldn't show
        let tempItems: Item[] = this.state.items!;
        const currentItem: Item = this.state.items![index];

        try {
            if (currentItem._id) {
                const deleteRequest = await fetch(
                    `/api/users/todos/${currentItem._id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                    }
                );

                await deleteRequest
                    .json()
                    .then(() => this.handleGetAllUserTodos());
            }

            // in case there is no DB call, we still update state here
            tempItems.splice(index, 1);
            this.setState((prevState: State) => ({
                ...prevState,
                items: tempItems,
            }));
        } catch (error) {
            console.error(error);
        }

        return;
    };

    render() {
        return (
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    {/* The user in the application state is:{" "}
                    {this.props.applicationState.user} */}
                    <ApiCallButton />
                    <ToDoForm
                        items={this.state.items}
                        isAuthenticated={
                            this.props.applicationState.isAuthenticated
                        }
                        handleCreateOnClick={this.handleCreateOnClick}
                        handleIsCompleteChange={this.handleIsCompleteChange}
                        handleDeleteOnClick={this.handleDeleteOnClick}
                    />
                </header>
            </div>
        );
    }
}

export default Main;
