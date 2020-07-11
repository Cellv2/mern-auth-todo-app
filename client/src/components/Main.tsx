import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ToDoForm from "./ToDos/ToDoForm";

import { Item } from "../types/to-do.types";
import { ApplicationState } from "../types/application-state.types";
import { UpdateStateActions } from "../types/state-action.types";
import { tokenSelector, isAuthenticatedSelector } from "../app/user-slice";
import { addItems, itemsSelector } from "../app/item-slice";

import styles from "./Main.module.scss";

//TODO: Remove
import Counter from "../app/Counter";

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

const testItems: Item[] = [
    { isComplete: true, text: "Item 1", timestamp: Date.now() },
    { isComplete: false, text: "Item 2", timestamp: Date.now() + 1 },
    { isComplete: false, text: "Item 3", timestamp: Date.now() + 2 },
];

// TODO: Probably just make this a functional component now
const Main = (props: Props) => {
    const token = useSelector(tokenSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useDispatch();

    const [stateItems, setStateItems] = useState<Item[] | undefined>(testItems);
    const {
        //  isAuthenticated,
        user,
        items,
    } = props.applicationState;
    const unsavedItemsExist: boolean =
        isAuthenticated &&
        user !== null &&
        !items.every((item) => "_id" in item);

    useEffect(() => {
        // useEffect doesn't like async functions, so we wrap it and call the wrapper
        const asyncWrapper = async () => {
            await handleGetAllUserTodos();
        };

        asyncWrapper();
    }, []);

    const handleGetAllUserTodos = async (): Promise<void> => {
        const { isAuthenticated, user } = props.applicationState;
        if (isAuthenticated && token !== null) {
            console.log("we're authed");
            // const token = user.token as string;

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
                        timestamp: todo.timestamp,
                    };

                    return item;
                });

                // no need to merge with current state EXECPT if the items have no ID (they are not committed to the DB)
                const unsavedItems = props.applicationState.items.filter(
                    (item) => !("_id" in item)
                );
                const newItems = [...unsavedItems, ...todoToItems];

                let newState = props.applicationState;
                newState.items = newItems;

                props.handleAppStateUpdate(newState, "updateItemsState");

                dispatch(addItems(newItems));
            }
        }

        return;
    };

    // TODO: Fix this function so it calls handleItemCreation
    const handleCreateOnClick = async (inText: string): Promise<void> => {
        const {
            isAuthenticated,
            user,
            items: appStateItems,
        } = props.applicationState;

        // this is used futher down so we don't need to repeat the state update depending on whether user is authed
        let newState = props.applicationState;

        // this is an array as the API expects an array input
        const newItem: Item[] = [
            { isComplete: false, text: inText, timestamp: Date.now() },
        ];

        if (isAuthenticated && token !== null) {
            // const token = user.token as string;

            const response = await fetch(`/api/user/todos`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(newItem),
            });

            // the API returns an array of Item objects
            const createdItem: Item[] = await response.json();
            const newItems = [...appStateItems, ...createdItem];
            newState.items = newItems;
        } else {
            const newItems = [...appStateItems, ...newItem];
            newState.items = newItems;
        }

        props.handleAppStateUpdate(newState, "updateItemsState");
        dispatch(addItems(newState.items));
    };

    /**
     * Generic item update handler for both local state and database updates
     * @param {Item} item The updated Item object to be saved
     * @param {number} index The index of the item - required as local state items do not have an ID
     */
    const handleItemUpdate = async (
        item: Item,
        index: number
    ): Promise<void> => {
        const { handleAppStateUpdate, applicationState } = props;
        // const { isAuthenticated, user } = applicationState;
        console.log("handleItemUpdate - clicky");

        try {
            if (isAuthenticated && token !== null && item._id) {
                // const token = user.token as string;

                const updateRequest = await fetch(
                    `/api/user/todos/${item._id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(item),
                    }
                );

                await updateRequest;
            }

            let newState = applicationState;
            newState.items[index] = item;

            handleAppStateUpdate(newState, "updateItemsState");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteOnClick = async (index: number): Promise<void> => {
        const { handleAppStateUpdate, applicationState } = props;
        const {
            // isAuthenticated,
            // user,
            items: appStateItems,
        } = applicationState;

        const currentItem = appStateItems[index];

        let newState = applicationState;

        try {
            if (isAuthenticated && token !== null && currentItem._id) {
                // const token = user.token as string;

                const deleteRequest = await fetch(
                    `/api/users/todos/${currentItem._id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(currentItem),
                    }
                );

                await deleteRequest;
            }

            // in case there is no DB call, we still update state here
            newState.items.splice(index, 1);
            handleAppStateUpdate(newState, "updateItemsState");
            // dispatch(deleteItem(currentItem));
        } catch (err) {
            console.error(err);
        }

        return;
    };

    /**
     * Sends request to save an array items into the database
     * @param {Item[]} items An array of items
     */
    const handleItemCreation = async (
        items: Item[]
    ): Promise<Item[] | undefined> => {
        console.log("handle item create clicked");
        const { applicationState } = props;
        // const { isAuthenticated, user } = applicationState;
        try {
            if (isAuthenticated && token !== null) {
                // const token = user.token as string;

                const saveRequest = await fetch(`/api/user/todos`, {
                    method: "POST",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(items),
                });

                // TODO: Update the now saved items with their IDs in local state
                const saveResponse = await saveRequest.json();
                console.log(saveResponse);
                return saveResponse;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveUnsavedItems = async (): Promise<void> => {
        const { items } = props.applicationState;

        // we cannot both filter items AND keep the index of where that item was in state
        // we create a type which keeps the index which the item is in, then filter it down to only the items we need to save
        // we then use this later on to overwrite the specific state item based
        // we do this to avoid additional database calls (i.e. loading all items again)
        type ItemsWithStateIndex = {
            index: number;
            item: Item;
        };
        const itemsToSaveWithIndex: ItemsWithStateIndex[] = items
            .map((item, index) => {
                const itemToSave: ItemsWithStateIndex = {
                    index: index,
                    item: item,
                };

                return itemToSave;
            })
            .filter((item) => !("_id" in item.item));

        const itemsToSave: Item[] = itemsToSaveWithIndex.map(
            (item) => item.item
        );

        try {
            let stateItemsToSave = items;

            const createdItems = await handleItemCreation(itemsToSave);
            createdItems?.forEach((item, index) => {
                stateItemsToSave[index] = item;
            });

            //TODO: Is this needed?
            // this.setState((prevState: State) => ({
            //     ...prevState,
            //     items: stateItemsToSave,
            // }));
            setStateItems(stateItemsToSave);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.gridMain}>
            {/* //TODO: Remove */}
            {/* <Counter /> */}
            <main className={styles.mainContent}>
                <ToDoForm
                    items={props.applicationState.items}
                    // items={stateItems}
                    isAuthenticated={props.applicationState.isAuthenticated}
                    handleCreateOnClick={handleCreateOnClick}
                    handleDeleteOnClick={handleDeleteOnClick}
                    handleItemUpdate={handleItemUpdate}
                    username={props.applicationState.username}
                />
            </main>
            {unsavedItemsExist && (
                <p>
                    You have items that are not in the database{" "}
                    <button onClick={handleSaveUnsavedItems}>
                        Click to save
                    </button>
                </p>
            )}
        </div>
    );
};

// class Main extends Component<Props, State> {
//     state: State = {
//         items: [
//             { isComplete: true, text: "Item 1", timestamp: Date.now() },
//             { isComplete: false, text: "Item 2", timestamp: Date.now() },
//             { isComplete: false, text: "Item 3", timestamp: Date.now() },
//         ],
//     };

//     async componentDidMount() {
//         await this.handleGetAllUserTodos();

//         return;
//     }

//     handleGetAllUserTodos = async (): Promise<void> => {
//         const { isAuthenticated, user } = this.props.applicationState;
//         if (isAuthenticated && user !== null) {
//             const token = user.token as string;

//             const fetchUserTodos = await fetch(`/api/user/todos`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: token,
//                 },
//             });
//             const userTodos: Item[] = await fetchUserTodos.json();

//             if (userTodos.length) {
//                 const todoToItems: Item[] = userTodos.map((todo) => {
//                     const item: Item = {
//                         _id: todo._id,
//                         userid: todo.userid,
//                         isComplete: todo.isComplete,
//                         text: todo.text,
//                         timestamp: todo.timestamp,
//                     };

//                     return item;
//                 });

//                 // no need to merge with current state EXECPT if the items have no ID (they are not committed to the DB)
//                 const unsavedItems = this.props.applicationState.items.filter(
//                     (item) => !("_id" in item)
//                 );
//                 const newItems = [...unsavedItems, ...todoToItems];

//                 let newState = this.props.applicationState;
//                 newState.items = newItems;

//                 this.props.handleAppStateUpdate(newState, "updateItemsState");
//             }
//         }

//         return;
//     };

//     // TODO: Fix this function so it calls handleItemCreation
//     handleCreateOnClick = async (inText: string): Promise<void> => {
//         const {
//             isAuthenticated,
//             user,
//             items: appStateItems,
//         } = this.props.applicationState;

//         // this is used futher down so we don't need to repeat the state update depending on whether user is authed
//         let newState = this.props.applicationState;

//         // this is an array as the API expects an array input
//         const newItem: Item[] = [
//             { isComplete: false, text: inText, timestamp: Date.now() },
//         ];

//         if (isAuthenticated && user !== null) {
//             const token = user.token as string;

//             const response = await fetch(`/api/user/todos`, {
//                 method: "POST",
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: token,
//                     "Content-Type": "application/json;charset=utf-8",
//                 },
//                 body: JSON.stringify(newItem),
//             });

//             // the API returns an array of Item objects
//             const createdItem: Item[] = await response.json();
//             const newItems = [...appStateItems, ...createdItem];
//             newState.items = newItems;
//         } else {
//             const newItems = [...appStateItems, ...newItem];
//             newState.items = newItems;
//         }

//         this.props.handleAppStateUpdate(newState, "updateItemsState");
//     };

//     /**
//      * Generic item update handler for both local state and database updates
//      * @param {Item} item The updated Item object to be saved
//      * @param {number} index The index of the item - required as local state items do not have an ID
//      */
//     handleItemUpdate = async (item: Item, index: number): Promise<void> => {
//         const { handleAppStateUpdate, applicationState } = this.props;
//         const { isAuthenticated, user } = applicationState;
//         console.log("handleItemUpdate - clicky");

//         try {
//             if (isAuthenticated && user && item._id) {
//                 const token = user.token as string;

//                 const updateRequest = await fetch(
//                     `/api/user/todos/${item._id}`,
//                     {
//                         method: "PUT",
//                         headers: {
//                             Authorization: token,
//                             "Content-Type": "application/json;charset=utf-8",
//                         },
//                         body: JSON.stringify(item),
//                     }
//                 );

//                 await updateRequest;
//             }

//             let newState = applicationState;
//             newState.items[index] = item;

//             handleAppStateUpdate(newState, "updateItemsState");
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     handleDeleteOnClick = async (index: number): Promise<void> => {
//         const { handleAppStateUpdate, applicationState } = this.props;
//         const {
//             isAuthenticated,
//             user,
//             items: appStateItems,
//         } = applicationState;

//         const currentItem = appStateItems[index];

//         let newState = applicationState;

//         try {
//             if (isAuthenticated && user !== null && currentItem._id) {
//                 const token = user.token as string;

//                 const deleteRequest = await fetch(
//                     `/api/users/todos/${currentItem._id}`,
//                     {
//                         method: "DELETE",
//                         headers: {
//                             Authorization: token,
//                             "Content-Type": "application/json;charset=utf-8",
//                         },
//                         body: JSON.stringify(currentItem),
//                     }
//                 );

//                 await deleteRequest;
//             }

//             // in case there is no DB call, we still update state here
//             newState.items.splice(index, 1);
//             handleAppStateUpdate(newState, "updateItemsState");
//         } catch (err) {
//             console.error(err);
//         }

//         return;
//     };

//     /**
//      * Sends request to save an array items into the database
//      * @param {Item[]} items An array of items
//      */
//     handleItemCreation = async (items: Item[]): Promise<Item[] | undefined> => {
//         console.log("handle item create clicked");
//         const { applicationState } = this.props;
//         const { isAuthenticated, user } = applicationState;
//         try {
//             if (isAuthenticated && user !== null) {
//                 const token = user.token as string;

//                 const saveRequest = await fetch(`/api/user/todos`, {
//                     method: "POST",
//                     headers: {
//                         Authorization: token,
//                         "Content-Type": "application/json;charset=utf-8",
//                     },
//                     body: JSON.stringify(items),
//                 });

//                 // TODO: Update the now saved items with their IDs in local state
//                 const saveResponse = await saveRequest.json();
//                 console.log(saveResponse);
//                 return saveResponse;
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     handleSaveUnsavedItems = async (): Promise<void> => {
//         const { items } = this.props.applicationState;

//         // we cannot both filter items AND keep the index of where that item was in state
//         // we create a type which keeps the index which the item is in, then filter it down to only the items we need to save
//         // we then use this later on to overwrite the specific state item based
//         // we do this to avoid additional database calls (i.e. loading all items again)
//         type ItemsWithStateIndex = {
//             index: number;
//             item: Item;
//         };
//         const itemsToSaveWithIndex: ItemsWithStateIndex[] = items
//             .map((item, index) => {
//                 const itemToSave: ItemsWithStateIndex = {
//                     index: index,
//                     item: item,
//                 };

//                 return itemToSave;
//             })
//             .filter((item) => !("_id" in item.item));

//         const itemsToSave: Item[] = itemsToSaveWithIndex.map(
//             (item) => item.item
//         );

//         try {
//             let stateItemsToSave = items;

//             const createdItems = await this.handleItemCreation(itemsToSave);
//             createdItems?.forEach((item, index) => {
//                 stateItemsToSave[index] = item;
//             });

//             this.setState((prevState: State) => ({
//                 ...prevState,
//                 items: stateItemsToSave,
//             }));
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     render() {
//         const { isAuthenticated, user, items } = this.props.applicationState;
//         const unsavedItemsExist: boolean =
//             isAuthenticated &&
//             user !== null &&
//             !items.every((item) => "_id" in item);

//         return (
//             <div className={styles.gridMain}>
//                 {/* //TODO: Remove */}
//                 <Counter />
//                 <main className={styles.mainContent}>
//                     <ToDoForm
//                         items={this.props.applicationState.items}
//                         isAuthenticated={
//                             this.props.applicationState.isAuthenticated
//                         }
//                         handleCreateOnClick={this.handleCreateOnClick}
//                         handleDeleteOnClick={this.handleDeleteOnClick}
//                         handleItemUpdate={this.handleItemUpdate}
//                         username={this.props.applicationState.username}
//                     />
//                 </main>
//                 {unsavedItemsExist && (
//                     <p>
//                         You have items that are not in the database{" "}
//                         <button onClick={this.handleSaveUnsavedItems}>
//                             Click to save
//                         </button>
//                     </p>
//                 )}
//             </div>
//         );
//     }
// }

export default Main;
