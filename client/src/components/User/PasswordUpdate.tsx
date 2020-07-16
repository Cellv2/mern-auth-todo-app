import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import Alerts from "../Alerts/Alerts";

import {
    updatePasswordAsync,
    updateUserAsyncTestTestTest,
} from "../../app/user-slice";
import { AlertSettings } from "../../types/alerts.types";
import {
    signInError,
    pwIsEmpty,
    pwsNotMatching,
    server500,
    serverPasswordUpdated,
    serverAuthError,
    serverUnknownError,
} from "../../constants/alert-settings";

type Props = {
    token: string;
};

const PasswordUpdate = (props: Props) => {
    const dispatch = useDispatch();
    const [passwordOne, setPasswordOne] = useState<string>("");
    const [showPwOne, setShowPwOne] = useState<boolean>(false);
    const [passwordTwo, setPasswordTwo] = useState<string>("");
    const [showPwTwo, setShowPwTwo] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<AlertSettings>({
        heading: "Alert!",
        messages: {},
    });

    const requestPasswordUpdate = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        // we want to prevent form redirection when submitted
        event.preventDefault();

        // this should never happen, but just in case
        if (!props.token) {
            setAlerts(signInError);
            return;
        }

        if (passwordOne === "" || passwordTwo === "") {
            setAlerts(pwIsEmpty);
            return;
        }

        if (passwordOne !== passwordTwo) {
            setAlerts(pwsNotMatching);
            return;
        }

        // try {
        //     const token = props.token as string;
        //     const passwordUpdate = {
        //         passwordOne: passwordOne,
        //         passwordTwo: passwordTwo,
        //     };

        //     const request = await fetch(`/api/user/password/updatePassword`, {
        //         method: "PUT",
        //         headers: {
        //             Authorization: token,
        //             "Content-Type": "application/json;charset=utf-8",
        //         },
        //         body: JSON.stringify(passwordUpdate),
        //     });

        //     const response = await request;
        //     if (!response.ok) {
        //         if (response.status === 500) {
        //             setAlerts(server500);
        //         }

        //         if (response.status === 422) {
        //             setAlerts(pwsNotMatching);
        //         }

        //         if (response.status === 401 || response.status === 403) {
        //             setAlerts(serverAuthError);
        //         }

        //         return;
        //     }

        //     setAlerts(serverPasswordUpdated);
        //     setPasswordOne("");
        //     setPasswordTwo("");
        // } catch (error) {
        //     setAlerts(serverUnknownError);
        //     return;
        // }

        console.log("COMPONENT - BEFORE DISPATCH");
        dispatch(updatePasswordAsync({ passwordOne, passwordTwo }));
        console.log("COMPONENT - AFTER DISPATCH");


        // look at this against https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
        const resultAction = await dispatch(updateUserAsyncTestTestTest);
        dispatch(updateUserAsyncTestTestTest({isAuthenticated: false}))
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
                                value={passwordOne}
                                onChange={(e) => setPasswordOne(e.target.value)}
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
                                value={passwordTwo}
                                onChange={(e) => setPasswordTwo(e.target.value)}
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
