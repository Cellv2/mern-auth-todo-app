import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ToDoForm from "./ToDos/ToDoForm";

import { isAuthenticatedSelector, tokenSelector } from "../app/user-slice";
import {
    getItemsAsync,
    dirtyItemsSelector,
    addDirtyItemsToDatabaseAsync,
} from "../app/item-slice";

import styles from "./Main.module.scss";
import Container from "react-bootstrap/Container";

type Props = {};

const Main = (props: Props) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const token = useSelector(tokenSelector);
    const dirtyItems = useSelector(dirtyItemsSelector);
    const dispatch = useDispatch();

    let unsavedItemsExist: boolean =
        dirtyItems.length > 0 && isAuthenticated && token !== null;

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

    const handleSaveUnsavedItems = () => {
        dispatch(addDirtyItemsToDatabaseAsync(dirtyItems));
    };

    return (
        <Container fluid className={`${styles.gridMain} p-0`}>
            <main className="h-100 d-flex flex-column justify-content-between">
                <div className="mt-5">
                    <ToDoForm />
                </div>
                <div className="my-2">
                    {!unsavedItemsExist && (
                        <p>
                            You have items that are not in the database{" "}
                            <button onClick={handleSaveUnsavedItems}>
                                Click to save
                            </button>
                        </p>
                    )}
                </div>
            </main>
        </Container>
    );
};

export default Main;
