import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import jwtDecode from "jwt-decode";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";

import styles from "./Login.module.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

interface Props extends RouteComponentProps {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
}

type State = {
    email: string;
    password: string;
    errors: {
        [key: string]: string;
    };
};

class Login extends Component<Props, State> {
    state: State = {
        email: "",
        password: "",
        errors: {},
    };

    redirectToHome = () => {
        const { history } = this.props;
        if (history) {
            history.push("/");
        }
    };

    handleOnSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const body = {
            email: this.state.email,
            password: this.state.password,
        };

        const request = await fetch(`/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        if (!(await request.ok)) {
            const errors = await request.json();
            console.log(errors);
            this.setState((prevstate: State) => ({
                ...prevstate,
                errors: errors,
            }));
        } else {
            const content = await request.json();

            // TODO: Also save token into local storage on login ?
            console.log(jwtDecode(content.token));

            console.log(content);

            this.setState((prevState: State) => ({
                ...prevState,
                errors: {},
            }));

            let newAppState = this.props.applicationState;
            newAppState.user = content;
            newAppState.isAuthenticated = true;
            newAppState.theme = content.theme;
            newAppState.username = content.username;

            this.props.handleAppStateUpdate(newAppState, "updateUserState");

            this.redirectToHome();
        }

        return;
    };

    handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [key]: value,
        }));

        return;
    };

    render() {
        return (
            <>
                <Form
                    className={styles.gridMain}
                    onSubmit={this.handleOnSubmit}
                >
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
                                    value={this.state.email}
                                    onChange={this.handleInputOnChange}
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
                                    value={this.state.password}
                                    onChange={this.handleInputOnChange}
                                    autoComplete="new-password"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="justify-content-md-center"
                        >
                            <Col sm={{ span: 6, offset: 2 }}>
                                <Button type="submit">Sign in</Button>
                            </Col>
                        </Form.Group>
                    </Container>
                </Form>
                {/* <div className={styles.gridMain}>
                    {Object.keys(this.state.errors).length > 0 &&
                        Object.keys(this.state.errors).map((error) => {
                            return (
                                <p key={error} className={styles.error}>
                                    Error: {this.state.errors[error]}
                                </p>
                            );
                        })}
                    <form onSubmit={this.handleOnSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                name="email"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleInputOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                name="password"
                                type="text"
                                value={this.state.password}
                                onChange={this.handleInputOnChange}
                                autoComplete="new-password"
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                    <div>
                        Not signed up yet? Click{" "}
                        <span>
                            <Link to="/register">here</Link>
                        </span>
                        !
                    </div>
                </div> */}
            </>
        );
    }
}

export default withRouter(Login);
