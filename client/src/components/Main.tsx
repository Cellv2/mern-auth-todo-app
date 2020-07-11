import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ToDoForm from "./ToDos/ToDoForm";

import {
    getItemsAsync,
    dirtyItemsSelector,
    addDirtyItemsToDatabaseAsync,
} from "../app/item-slice";

import styles from "./Main.module.scss";

type Props = {};

const Main = (props: Props) => {
    const dirtyItems = useSelector(dirtyItemsSelector);
    const dispatch = useDispatch();

    const unsavedItemsExist: boolean = dirtyItems.length > 0;

    useEffect(() => {
        // useEffect doesn't like async functions, so we wrap it and call the wrapper
        const asyncWrapper = async () => {
            await handleGetAllUserTodos();
        };

        asyncWrapper();
    }, []);

    const handleGetAllUserTodos = async (): Promise<void> => {
        dispatch(getItemsAsync());
    };

    const handleSaveUnsavedItems = async (): Promise<void> => {
        await dispatch(addDirtyItemsToDatabaseAsync(dirtyItems));
    };

    return (
        <div className={styles.gridMain}>
            <main className={styles.mainContent}>
                <ToDoForm />
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

export default Main;
