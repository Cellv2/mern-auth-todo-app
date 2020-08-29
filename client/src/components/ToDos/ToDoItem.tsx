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
import { isAuthenticatedSelector } from "../../app/user-slice";
import { deleteItemAsync, updateItemAsync } from "../../app/item-slice";

type Props = {
    item: Item;
    index: number;
};

const ToDoItem = (props: Props) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useDispatch();

    const { item, index } = props;
    const inputRef = useRef<HTMLTextAreaElement>(null);
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(props.item.isBeingEdited);
    const [inputValue, setInputValue] = useState<string>(props.item.text);
    const [isComplete, setIsComplete] = useState<boolean>(
        props.item.isComplete
    );
    const [inputSnapshot, setInputSnapshop] = useState<string>(props.item.text);

    useEffect(() => {
        setInputValue(props.item.text);
        setIsComplete(props.item.isComplete);
        setIsEditing(props.item.isBeingEdited)
    }, [props.item]);

    // we have to ensure the update is done after the state is updated (hook update is async)
    useEffect(() => {
        const updated: Item = { ...props.item, isComplete: isComplete };
        dispatch(updateItemAsync(updated));
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
            const updated: Item = { ...props.item, isBeingEdited: true };
            dispatch(updateItemAsync(updated));
            setInputSnapshop(inputValue);
        }

        if (isEditing) {
            const updated: Item = { ...props.item, text: inputValue, isBeingEdited: false };
            dispatch(updateItemAsync(updated));
        }

        setIsEditing(!isEditing);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ): void => {
        if (isEditing && event.key === "Enter" && inputValue !== "") {
            const updated: Item = { ...props.item, text: inputValue, isBeingEdited: false };
            dispatch(updateItemAsync(updated));
            // setIsEditing(false);
        }

        if (isEditing && event.key === "Escape") {
            const updated: Item = { ...props.item, text: inputSnapshot, isBeingEdited: false };
            dispatch(updateItemAsync(updated));
            // setInputValue(inputSnapshot);
            // setIsEditing(false);
        }
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
