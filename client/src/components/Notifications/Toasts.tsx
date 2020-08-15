import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";

import {
    notificationSelector,
    notificationMessageSelector,
    notificationTypeSelector,
} from "../../app/notification-slice";
import { NotificationTypes } from "../../types/notification.types";

import "./Toasts.scss"; //not a module because we need to override bootstrap styling

type Props = {};

const cssMapping: { [key in NotificationTypes]: string } = {
    Error: "errorToast",
    Success: "successToast",
};

const Toasts = (props: Props) => {
    const notification = useSelector(notificationSelector);
    const notificationMessage = useSelector(notificationMessageSelector);
    const notificationType = useSelector(notificationTypeSelector);

    const [show, setShow] = useState(false);
    const [header, setHeader] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [toastType, setToastType] = useState<string>();

    useEffect(() => {
        // if (!notification || !notification.type || !notification.message) {
        if (!notificationMessage || !notificationType) {
            setShow(false);
            return;
        }

        setHeader(notificationType);
        setMessage(notificationMessage);
        setToastType(cssMapping[notificationType]);
        setShow(true);
    }, [notificationMessage, notificationType]);

    // if (!notification || !notification.type || !notification.message) {
    //     setShow(false);
    //     return;
    // }

    // setHeader(notification.type);
    // setMessage(notification.message);
    // setToastType(cssMapping[notification.type]);
    // setShow(true);
    // }, [notification]);

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
