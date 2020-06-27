import { AlertProps } from "react-bootstrap/Alert";

export type AlertSettings = {
    heading: string;
    messages: {
        [key: string]: string;
    };
    variant?: AlertProps["variant"];
};
