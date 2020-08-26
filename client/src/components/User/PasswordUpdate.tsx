import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { setUserNotification, updatePasswordAsync } from "../../app/user-slice";
import { Notifications } from "../../constants/notifications";
import { useAppDispatch } from "../../app/store";

type Props = {
    token: string;
};

const PasswordUpdate = (props: Props) => {
    const appDispatch = useAppDispatch();
    const [passwordOne, setPasswordOne] = useState<string>("");
    const [showPwOne, setShowPwOne] = useState<boolean>(false);
    const [passwordTwo, setPasswordTwo] = useState<string>("");
    const [showPwTwo, setShowPwTwo] = useState<boolean>(false);

    const requestPasswordUpdate = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        // we want to prevent form redirection when submitted
        event.preventDefault();

        // this should never happen, but just in case
        if (!props.token) {
            appDispatch(setUserNotification(Notifications.UserNotLoggedIn));
            return;
        }

        if (passwordOne === "" || passwordTwo === "") {
            appDispatch(
                setUserNotification(
                    Notifications.UserPasswordUpdateFailedPasswordsDoNotMatch
                )
            );
            return;
        }

        if (passwordOne !== passwordTwo) {
            appDispatch(
                setUserNotification(
                    Notifications.UserPasswordUpdateFailedPasswordsDoNotMatch
                )
            );
            return;
        }

        const updatePayload = { passwordOne, passwordTwo };
        appDispatch(updatePasswordAsync(updatePayload));
    };

    return (
        <Form noValidate onSubmit={requestPasswordUpdate}>
            <Container fluid>
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
