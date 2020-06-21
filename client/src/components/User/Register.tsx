import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alerts from "../Alerts/Alerts";
import Button from "react-bootstrap/Button";

import styles from "./Register.module.scss";

interface Props extends RouteComponentProps {}

type State = {
    username: string;
    email: string;
    password: string;
    errors?: {
        username?: string;
        email?: string;
        password?: string;
    };
};

class Register extends Component<Props, State> {
    state = {
        username: "",
        email: "",
        password: "",
        errors: {},
    };

    redirectToLogin = () => {
        const { history } = this.props;
        if (history) {
            history.push("/login");
        }
    };

    handleOnSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        console.log("aweadsawdasd");

        const body = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        const request = await fetch("/api/users/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        if (!(await request.ok)) {
            const errors = await request.json();
            console.log(errors);

            this.setState((prevState: State) => ({
                ...prevState,
                errors: errors,
            }));
        } else {
            const content = await request.json();
            console.log(content);

            this.setState((prevState: State) => ({
                ...prevState,
                errors: {},
            }));

            this.redirectToLogin();
        }
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
    };

    render() {
        return (
            <div className={styles.gridMain}>
                <h1 className="text-center mt-3 mb-sm-5">Register</h1>
                <Form noValidate onSubmit={this.handleOnSubmit}>
                    <Container fluid>
                        <Form.Group
                            as={Row}
                            controlId="formAlerts"
                            className="justify-content-md-center"
                        >
                            <Col sm={9}>
                                <Alerts
                                    alertHeading="Ut-oh! Errors!"
                                    errors={this.state.errors}
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
                                    value={this.state.username}
                                    onChange={this.handleInputOnChange}
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
                                <Button type="submit">Register</Button>
                                <Form.Text className="mt-3">
                                    Already registered? Sign in{" "}
                                    <Link to="/login">here</Link>!
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Container>
                </Form>
                {/* <div>This is the register page</div>
                <div>
                    Already registered? Click{" "}
                    <span>
                        <Link to="/login">here</Link>
                    </span>{" "}
                    to log in
                </div>
                <form noValidate onSubmit={this.handleOnSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputOnChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputOnChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputOnChange}
                        />
                    </div>
                    <button>Click to submit</button>
                </form> */}
            </div>
        );
    }
}

export default withRouter(Register);
