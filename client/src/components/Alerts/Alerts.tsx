import React, { useState, useEffect } from "react";
import Alert, { AlertProps } from "react-bootstrap/Alert";

import styles from "./Alerts.module.scss";

interface Props extends AlertProps {
    alertHeading: string;
    errors: {
        [key: string]: string;
    };
}

/**
 * Wraps react-bootstrap's <Alert> component with a little extra logic
 * If errors.length !== 0, it will display all the errors passed in
 * @param props Expects both an alertHeading and an error object
 * @defaults variant: info, dismissable: true
 */
const Alerts = (props: Props) => {
    // separate own props/className and those inherited from AlertProps for the spread operator later
    const { alertHeading, errors, className, ...rest } = props;

    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        if (errorText.length !== 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [errors]);

    let errorText: string[] = [];
    for (const error in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, error)) {
            const element = errors[error];
            errorText.push(element);
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
                {errorText.map((error, index) => {
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
