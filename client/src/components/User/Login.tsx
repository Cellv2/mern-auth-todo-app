import React, { useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { loginUserAsync } from "../../app/user-slice";
import { useAppDispatch } from "../../app/store";

import styles from "./Login.module.scss";

interface Props extends RouteComponentProps {}

const Login = (props: Props) => {
    const appDispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const redirectToHome = () => {
        const { history } = props;
        if (history) {
            history.push("/");
        }
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const loginPayload = { email, password };
        appDispatch(loginUserAsync(loginPayload)).then((bool) => {
            if (bool) {
                redirectToHome();
            }
        });
    };

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        if (key === "email") {
            setEmail(value);
        } else if (key === "password") {
            setPassword(value);
        }
    };

    return (
        <div className={styles.gridMain}>
            <h1 className="text-center mt-3 mb-sm-5">Sign in</h1>
            <Form noValidate onSubmit={handleOnSubmit}>
                <Container fluid>
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
                                value={email}
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
                                name="password"
                                value={password}
                                onChange={handleInputOnChange}
                                autoComplete="new-password"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Col sm={{ span: 6, offset: 2 }}>
                            <Button type="submit">Sign in</Button>
                            <Form.Text className="mt-3">
                                Not registered yet? Click{" "}
                                <Link to="/register">here</Link>!
                            </Form.Text>
                        </Col>
                    </Form.Group>
                </Container>
            </Form>
        </div>
    );
};

export default withRouter(Login);
