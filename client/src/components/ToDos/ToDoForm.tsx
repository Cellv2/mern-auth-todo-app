import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ToDoItem from "./ToDoItem";
import ToDoCreate from "./ToDoCreate";

import { Item } from "../../types/to-do.types";

type Props = {
    items?: Item[];
    isAuthenticated: boolean;
    handleCreateOnClick: (inText: string) => void;
    handleDeleteOnClick: (index: number) => void;
    handleItemUpdate: (item: Item, index: number) => void;
    username: string | null;
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
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <div className="mb-5">
                        <h1>Hey, {props.username ?? "mysterious user"}!</h1>
                        <small>
                            <em>What do you need to get done today?</em>
                        </small>
                    </div>
                    <ToDoCreate handleCreateOnClick={handleCreateOnClick} />
                    {toDoItems}
                </Col>
            </Row>
        </Container>
    );
};

export default ToDoForm;
