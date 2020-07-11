import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faEdit,
    faTrashAlt,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ToDoItem.module.scss";

import { Item } from "../../types/to-do.types";
import { isAuthenticatedSelector, tokenSelector } from "../../app/user-slice";
import { deleteItemAsync, updateItemAsync } from "../../app/item-slice";

type Props = {
    item: Item;
    index: number;
    isAuthenticated: boolean;
    handleDeleteOnClick: (index: number) => void;
    handleItemUpdate: (item: Item, index: number) => void;
};

const ToDoItem = (props: Props) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useDispatch();

    const {
        item,
        index,
        // isAuthenticated,
        handleDeleteOnClick,
        handleItemUpdate,
    } = props;
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.item.text);
    const [isComplete, setIsComplete] = useState<boolean>(
        props.item.isComplete
    );
    const [inputSnapshot, setInputSnapshop] = useState<string>(props.item.text);

    useEffect(() => {
        setInputValue(props.item.text);
        setIsComplete(props.item.isComplete);
    }, [props.item]);

    // we have to ensure the update is done after the state is updated (hook update is async)
    useEffect(() => {
        // ! CRITICAL
        //TODO: Get item updates in redux state, this breaks because Main was made into a funcitonal component (#56)
        // updateItem();
    }, [isComplete]);

    useEffect(() => {
        correctTextAreaHeightViaRef(inputRef);
    }, [inputValue]);

    const correctTextAreaHeightViaRef = (
        ref: React.RefObject<HTMLTextAreaElement>
    ): void => {
        if (ref !== null && ref.current !== null) {
            const element = ref.current;
            // height doesn't seem to set correctly unless you update it first
            element.style.height = "1px";
            element.style.height = `${element.scrollHeight + 2}px`;
        }
    };

    const handleButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ): void => {
        if (!isEditing) {
            setInputSnapshop(inputValue);
        }

        if (isEditing) {
            const updated: Item = { ...props.item, text: inputValue };
            dispatch(updateItemAsync(updated));
            // updateItem();
        }

        setIsEditing(!isEditing);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ): void => {
        if (isEditing && event.key === "Enter" && inputValue !== "") {
            const updated: Item = { ...props.item, text: inputValue };
            console.log(updated);
            dispatch(updateItemAsync(updated));
            // updateItem();
            setIsEditing(false);
        }

        if (isEditing && event.key === "Escape") {
            setInputValue(inputSnapshot);
            setIsEditing(false);
        }
    };

    const updateItem = (): void => {
        let updatedItem = props.item;
        updatedItem.text = inputValue;
        updatedItem.isComplete = isComplete;

        handleItemUpdate(updatedItem, index);
    };

    return (
        <div>
            <InputGroup className="my-2" size="sm">
                <InputGroup.Prepend>
                    <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        checked={isComplete}
                        onChange={() => setIsComplete(!isComplete)}
                    />
                </InputGroup.Prepend>
                {isAuthenticated && item._id === undefined && (
                    <InputGroup.Prepend>
                        <InputGroup.Text id={`unsaved-item-${index}`}>
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                className={styles.unsavedItemIcon}
                                size={"sm"}
                                title={"This item is unsaved!"}
                            />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                )}
                <FormControl
                    ref={inputRef}
                    as="textarea"
                    aria-label="Text input with checkbox"
                    value={inputValue}
                    readOnly={!isEditing}
                    className={`${styles.inputText} ${
                        isComplete ? styles.complete : ""
                    }`}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-secondary"
                        onClick={handleButtonClick}
                        className={styles.actionButtons}
                    >
                        {isEditing ? (
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                                size={"sm"}
                                title="Save Item Edits"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-primary"
                                size={"sm"}
                                title="Edit Item"
                            />
                        )}
                    </Button>
                    <Button
                        variant="outline-secondary"
                        // onClick={() => handleDeleteOnClick(index)}
                        onClick={() => dispatch(deleteItemAsync(item))}
                        className={styles.actionButtons}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className={styles.deleteIcon}
                            size={"sm"}
                            title="Delete Item"
                        />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default ToDoItem;
