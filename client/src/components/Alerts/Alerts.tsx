import React from "react";
import Alert, { AlertProps } from "react-bootstrap/Alert";

interface Props extends AlertProps {
    alertHeading: string;
    errors: {
        [key: string]: string;
    };
}

/**
 * Wraps react-bootstrap's <Alert> component with a little extra logic
 * If errors.length !== 0, it will display all the errors passed in
 * If no variant is passed in, it will default back to "info"
 * @param props Expects both an alertHeading and an error object
 */
const Alerts = (props: Props) => {
    const errorText: string[] = [];
    for (const error in props.errors) {
        if (Object.prototype.hasOwnProperty.call(props.errors, error)) {
            const element = props.errors[error];
            errorText.push(element);
        }
    }

    return errorText.length !== 0 ? (
        <Alert variant={props.variant ?? "info"} className={props.className}>
            <Alert.Heading>{props.alertHeading}</Alert.Heading>
            {errorText.map((error, index) => {
                return <p key={index}>{error}</p>;
            })}
        </Alert>
    ) : null;
};

export default Alerts;
