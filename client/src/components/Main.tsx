import React, { Component } from "react";
import JwtDecode from "jwt-decode";

import ToDoForm from "./ToDoForm";
import ApiCallButton from "./ApiCallButton";

import { Item } from "../types/to-do.types";
import { ApplicationState, UserToken } from "../types/application-state.types";
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

// TODO: Probably just make this a functional component now
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
        const { isAuthenticated, user } = this.props.applicationState;
        if (isAuthenticated && user !== null) {
            const token = user.token as string;

            const fetchUserTodos = await fetch(`/api/user/todos`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
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

                const newItems = [
                    ...this.props.applicationState.items,
                    ...todoToItems,
                ];

                let newState = this.props.applicationState;
                newState.items = newItems;

                this.props.handleAppStateUpdate(newState, "updateItemsState");
            }
        }

        return;
    };

    handleCreateOnClick = async (inText: string): Promise<void> => {
        const {
            isAuthenticated,
            user,
            items: appStateItems,
        } = this.props.applicationState;

        // this is used futher down so we don't need to repeat the state update depending on whether user is authed
        let newState = this.props.applicationState;

        const newItem: Item = { isComplete: false, text: inText };

        if (isAuthenticated && user !== null) {
            const token = user.token as string;

            const response = await fetch(`/api/user/todos`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(newItem),
            });

            const createdItem: Item = await response.json();
            const newItems = [...appStateItems, createdItem];
            newState.items = newItems;
        } else {
            const newItems = [...appStateItems, newItem];
            newState.items = newItems;
        }

        this.props.handleAppStateUpdate(newState, "updateItemsState");
    };

    // TODO: Make this a generic update handler for todo items?
    handleIsCompleteChange = (index: number): void => {
        const { applicationState, handleAppStateUpdate } = this.props;
        const {
            isAuthenticated,
            items: appStateItems,
            user,
        } = applicationState;

        let newState = applicationState;
        newState.items[index].isComplete = !newState.items[index].isComplete;

        handleAppStateUpdate(newState, "updateItemsState");

        return;
    };

    handleDeleteOnClick = async (index: number): Promise<void> => {
        const { handleAppStateUpdate, applicationState } = this.props;
        const {
            isAuthenticated,
            user,
            items: appStateItems,
        } = applicationState;

        const currentItem = appStateItems[index];

        let newState = applicationState;

        try {
            if (isAuthenticated && user !== null && currentItem._id) {
                const deleteRequest = await fetch(
                    `/api/users/todos/${currentItem._id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                    }
                );

                await deleteRequest;
            }

            // in case there is no DB call, we still update state here
            newState.items.splice(index, 1);
            handleAppStateUpdate(newState, "updateItemsState");
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
                        items={this.props.applicationState.items}
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
