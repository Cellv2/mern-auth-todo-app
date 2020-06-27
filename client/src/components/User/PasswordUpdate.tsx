import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { AlertProps } from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import Alerts from "../Alerts/Alerts";

import { UserToken } from "../../types/application-state.types";

type Props = {
    token: string | UserToken | undefined;
};

type AlertSettings = {
    heading: string;
    messages: {
        [key: string]: string;
    };
    variant?: AlertProps["variant"];
};

const PasswordUpdate = (props: Props) => {
    const [pwOne, setPwOne] = useState<string>("");
    const [showPwOne, setShowPwOne] = useState<boolean>(false);
    const [pwTwo, setPwTwo] = useState<string>("");
    const [showPwTwo, setShowPwTwo] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<AlertSettings>({
        heading: "Alert!",
        messages: {},
    });

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPwOne(event.target.value);
    };

    const handleInputOnKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            requestPasswordUpdate();
        }
    };

    // TODO: Add some UI feedback on successful/failed password update
    const requestPasswordUpdate = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        // we want to prevent form redirection when submitted
        event.preventDefault();

        let alertSettings: AlertSettings = {
            heading: "",
            messages: {},
        };

        if (!props.token) {
            alertSettings = {
                heading: "We couldn't sign you in",
                messages: {
                    "Sign in error":
                        "You do not seem to be signed in - Please sign in again and try updating your password again",
                },
                variant: "danger",
            };

            console.error("You must be signed in");
            setAlerts(alertSettings);
            return;
        }

        if (pwOne === "" || pwTwo === "") {
            alertSettings = {
                heading: "Password is empty",
                messages: {
                    pwsNotMatching:
                        "Please ensure that both passwords have a value and try again",
                },
                variant: "warning",
            };
            console.error("One of the passwords is blank");
            setAlerts(alertSettings);
            return;
        }

        if (pwOne !== pwTwo) {
            alertSettings = {
                heading: "The passwords do not match",
                messages: {
                    pwsNotMatching:
                        "Please ensure that both passwords match and try again",
                },
                variant: "warning",
            };
            console.error("The passwords do not match");
            setAlerts(alertSettings);
            return;
        }

        try {
            const token = props.token as string;
            const passwordUpdate = { password: pwOne };

            const request = await fetch(`/api/user/password/updatePassword`, {
                method: "PUT",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(passwordUpdate),
            });

            const response = await request;
            if (!response.ok) {
                alertSettings = {
                    heading: "Nope, server says 500!",
                    messages: {
                        "500": "Something went wrong, please try again later",
                    },
                    variant: "danger",
                };

                setAlerts(alertSettings);

                throw new Error(
                    `The response code (${response.status}) did not indicate success. The response was ${response.statusText}`
                );
            }

            alertSettings = {
                heading: "Password updated!",
                messages: {
                    pwUpdated: "Password has been updated successfully",
                },
                variant: "success",
            };
            console.log("Password updated successfully");
            setAlerts(alertSettings);
            setPwOne("");
            setPwTwo("");
        } catch (error) {
            alertSettings = {
                heading: "Nope, server says 401!",
                messages: {
                    "401":
                        "Please sign in again and try updating your password again",
                },
                variant: "danger",
            };

            console.error(error);
            setAlerts(alertSettings);
        }
    };

    return (
        <Form noValidate onSubmit={requestPasswordUpdate}>
            <Container fluid>
                <Form.Group
                    as={Row}
                    controlId="formAlerts"
                    className="justify-content-md-center"
                >
                    <Col>
                        <Alerts
                            alertHeading={alerts.heading}
                            messages={alerts.messages}
                            variant={alerts.variant ?? undefined}
                            className="p-1 mb-sm-4 text-center"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center">
                    <Form.Label column sm={3}>
                        New Password
                    </Form.Label>
                    <Col sm={6}>
                        <InputGroup>
                            <Form.Control
                                type={showPwOne ? "text" : "password"}
                                placeholder="New Password"
                                name="newPasswordOne"
                                value={pwOne}
                                // onKeyDown={handleInputOnKeyDown}
                                onChange={(e) => setPwOne(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={() => setShowPwOne(!showPwOne)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPwOne ? faEyeSlash : faEye}
                                    />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center">
                    <Form.Label column sm={3}>
                        Confirm Password
                    </Form.Label>
                    <Col sm={6}>
                        <InputGroup>
                            <Form.Control
                                type={showPwTwo ? "text" : "password"}
                                placeholder="Confirm Password"
                                name="newPasswordOne"
                                value={pwTwo}
                                // onKeyDown={handleInputOnKeyDown}
                                onChange={(e) => setPwTwo(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={() => setShowPwTwo(!showPwTwo)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPwTwo ? faEyeSlash : faEye}
                                    />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center">
                    <Col sm={{ span: 6, offset: 3 }} className="text-justify">
                        <Button type="submit">Update Password</Button>
                    </Col>
                </Form.Group>
            </Container>
        </Form>
    );
};

export default PasswordUpdate;
