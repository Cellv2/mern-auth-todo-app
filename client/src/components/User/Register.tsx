import React, { useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Alerts from "../Alerts/Alerts";
import { UserCreationPayload } from "../../types/api.types";
import { RegistrationErrors } from "../../types/errors.types";
import { useAppDispatch } from "../../app/store";
import { addUserAsync } from "../../app/user-slice";

import styles from "./Register.module.scss";

interface Props extends RouteComponentProps {}

const Register = (props: Props) => {
    const appDispatch = useAppDispatch();

    const [userInfo, setUserInfo] = useState<UserCreationPayload>({
        username: "",
        email: "",
        passwordOne: "",
        passwordTwo: "",
    });
    const [errors, setErrors] = useState<RegistrationErrors>({});

    const redirectToLogin = () => {
        const { history } = props;
        if (history) {
            history.push("/login");
        }
    };

    const handleOnSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const payload = userInfo;
        appDispatch(addUserAsync(payload)).then((bool) => {
            if (bool) {
                redirectToLogin();
            }
        });
    };

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        setUserInfo({ ...userInfo, [key]: value });
    };

    return (
        <div className={styles.gridMain}>
            <h1 className="text-center mt-3 mb-sm-5">Register</h1>
            <Form noValidate onSubmit={handleOnSubmit}>
                <Container fluid>
                    <Form.Group
                        as={Row}
                        controlId="formAlerts"
                        className="justify-content-md-center"
                    >
                        <Col sm={9}>
                            <Alerts
                                alertHeading="Ut-oh! Errors!"
                                messages={errors}
                                variant="danger"
                                className="p-1 mb-sm-4 text-center"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="formUsername"
                        className="justify-content-md-center"
                    >
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={userInfo.username}
                                onChange={handleInputOnChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="formEmail"
                        className="justify-content-md-center"
                    >
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputOnChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="formPassword"
                        className="justify-content-md-center"
                    >
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="passwordOne"
                                value={userInfo.passwordOne}
                                onChange={handleInputOnChange}
                                autoComplete="new-password"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="formPassword"
                        className="justify-content-md-center"
                    >
                        <Form.Label column sm={2}>
                            Confirm Password
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="passwordTwo"
                                value={userInfo.passwordTwo}
                                onChange={handleInputOnChange}
                                autoComplete="new-password"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Col sm={{ span: 6, offset: 2 }}>
                            <Button type="submit">Register</Button>
                            <Form.Text className="mt-3">
                                Already registered? Sign in{" "}
                                <Link to="/login">here</Link>!
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Container>
            </Form>
        </div>
    );
};

export default withRouter(Register);
