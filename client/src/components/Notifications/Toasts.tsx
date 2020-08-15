import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";

import { userErrorSelector } from "../../app/user-slice";
import { itemErrorSelector } from "../../app/item-slice";
import { notificationSelector } from "../../app/notification-slice";
import { NotificationTypes } from "../../types/notification.types";

import "./Toasts.scss"; //not a module because we need to override bootstrap styling

type Props = {};

const cssMapping: { [key in NotificationTypes]: string } = {
    Error: "errorToast",
    Success: "successToast",
};

const Toasts = (props: Props) => {
    const userError = useSelector(userErrorSelector);
    const itemError = useSelector(itemErrorSelector);
    const notification = useSelector(notificationSelector);

    const [show, setShow] = useState(true);
    const [header, setHeader] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [toastType, setToastType] = useState<string>();

    useEffect(() => {
        if (!notification || !notification.type || !notification.message) {
            setShow(false);
            return;
        }

        setHeader(notification.type);
        setMessage(notification.message);
        setToastType(cssMapping[notification.type]);
        setShow(true);
    }, [notification]);

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
        <div className={toastType ?? "defaultToast"}>
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
