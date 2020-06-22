import React, { useState, useEffect } from "react";
import Alert, { AlertProps } from "react-bootstrap/Alert";

import styles from "./Alerts.module.scss";

interface Props extends AlertProps {
    alertHeading: string;
    messages: {
        [key: string]: string;
    };
}

/**
 * Wraps react-bootstrap's <Alert> component with a little extra logic
 * If errors.length !== 0, it will display all the errors passed in
 * @param props Expects both an alertHeading and a message object
 * @defaults variant: info, dismissable: true
 */
const Alerts = (props: Props) => {
    // separate own props/className and those inherited from AlertProps for the spread operator later
    const { alertHeading, messages, className, ...rest } = props;

    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        if (messageArray.length !== 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [messages]);

    let messageArray: string[] = [];
    for (const message in messages) {
        if (Object.prototype.hasOwnProperty.call(messages, message)) {
            const element = messages[message];
            messageArray.push(element);
        }
    }

    if (show) {
        const classNameList = `${className ? className : ""} ${styles.buttonCloseColourFix}`;

        return (
            <Alert
                {...rest}
                variant={props.variant ?? "info"}
                className={classNameList}
                dismissible={props.dismissible ?? true}
                onClose={() => setShow(false)}
            >
                <Alert.Heading>{alertHeading}</Alert.Heading>
                {messageArray.map((error, index) => {
                    return (
                        <p key={index} className="m-2">
                            {error}
                        </p>
                    );
                })}
            </Alert>
        );
    }

    return null;
};

export default Alerts;
