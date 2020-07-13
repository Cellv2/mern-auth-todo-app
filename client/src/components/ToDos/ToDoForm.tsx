import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ToDoItem from "./ToDoItem";
import ToDoCreate from "./ToDoCreate";

import { Item } from "../../types/to-do.types";
import { usernameSelector } from "../../app/user-slice";
import { itemsSelector } from "../../app/item-slice";

import styles from "./ToDoForn.module.scss";

type Props = {};

const ToDoForm = (props: Props) => {
    const username = useSelector(usernameSelector);
    const items = useSelector(itemsSelector);

    let toDoItems: JSX.Element | JSX.Element[];
    if (items && items.length > 0) {
        // sort by timestamp in order to show the most recently created items at the top of the list
        const timestampSortedItems = items.sort(
            (a, b) => b.timestamp - a.timestamp
        );

        toDoItems = timestampSortedItems.map((item: Item, index: number) => {
            return <ToDoItem key={index} item={item} index={index} />;
        });
    } else {
        toDoItems = <div>There are no items</div>;
    }

    return (
        <Container fluid className={styles.formFont}>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <div className="mb-5">
                        <h1>Hey, {username ?? "mysterious user"}!</h1>
                        <small>
                            <em>What do you need to get done today?</em>
                        </small>
                    </div>
                    <ToDoCreate />
                    {toDoItems}
                </Col>
            </Row>
        </Container>
    );
};

export default ToDoForm;
