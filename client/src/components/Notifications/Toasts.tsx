import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";

import { userErrorSelector } from "../../app/user-slice";
import { itemErrorSelector } from "../../app/item-slice";

type Props = {};

const Toasts = (props: Props) => {
    const userError = useSelector(userErrorSelector);
    const itemError = useSelector(itemErrorSelector);

    const [show, setShow] = useState(false);
    const [header, setHeader] = useState<string>();
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (!userError) {
            setShow(false);
            return;
        }

        setHeader(Object.keys(userError)[0]);
        setMessage(Object.values(userError)[0]);
        setShow(true);
    }, [userError]);

    useEffect(() => {
        if (!itemError) {
            setShow(false);
            return;
        }

        setHeader(Object.keys(itemError)[0]);
        setMessage(Object.values(itemError)[0]);
        setShow(true);
    }, [itemError]);

    return (
        <div
            style={{
                position: "absolute",
                bottom: "2.5rem",
                right: 0,
            }}
        >
            <Toast
                show={show}
                onClose={() => setShow(false)}
                autohide
                delay={10000}
            >
                <Toast.Header>
                    <strong className="mr-auto">{header}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Toasts;
