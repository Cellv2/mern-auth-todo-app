import React, { Component, useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Alerts from "../Alerts/Alerts";
import { UserRegistration } from "../../types/user.types";

import styles from "./Register.module.scss";

interface Props extends RouteComponentProps {}

type State = {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    errors?: {
        username?: string;
        email?: string;
        password?: string;
    };
};

type RegistrationErrors = {
    [key: string]: string;
    // username?: string;
    // email?: string;
    // password?: string;
};

const RegisterFn = (props: Props) => {
    const [userInfo, setUserInfo] = useState<UserRegistration>({
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

        const body = userInfo;

        const request = await fetch("/api/users/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        if (!(await request.ok)) {
            const errors = await request.json();
            console.log(errors);

            setErrors(errors);
        } else {
            const content = await request.json();
            console.log(content);

            setErrors({});

            redirectToLogin();
        }
    };

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        // this.setState((prevState: State) => ({
        //     ...prevState,
        //     [key]: value,
        // }));

        // const
        console.log(key);
        console.log(value);
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

// TODO: really need to refactor this to a functional component
class Register extends Component<Props, State> {
    state = {
        username: "",
        email: "",
        passwordOne: "",
        passwordTwo: "",
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

        const body = {
            username: this.state.username,
            email: this.state.email,
            passwordOne: this.state.passwordOne,
            passwordTwo: this.state.passwordTwo,
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
                                    messages={this.state.errors}
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
                                    name="passwordOne"
                                    value={this.state.passwordOne}
                                    onChange={this.handleInputOnChange}
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
                                    value={this.state.passwordTwo}
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
            </div>
        );
    }
}

// class Register extends Component<Props, State> {
//     state = {
//         username: "",
//         email: "",
//         passwordOne: "",
//         passwordTwo: "",
//         errors: {},
//     };

//     redirectToLogin = () => {
//         const { history } = this.props;
//         if (history) {
//             history.push("/login");
//         }
//     };

//     handleOnSubmit = async (
//         event: React.FormEvent<HTMLFormElement>
//     ): Promise<void> => {
//         event.preventDefault();

//         const body = {
//             username: this.state.username,
//             email: this.state.email,
//             passwordOne: this.state.passwordOne,
//             passwordTwo: this.state.passwordTwo,
//         };

//         const request = await fetch("/api/users/addUser", {
//             method: "POST",
//             headers: { "Content-Type": "application/json;charset=utf-8" },
//             body: JSON.stringify(body),
//         });

//         if (!(await request.ok)) {
//             const errors = await request.json();
//             console.log(errors);

//             this.setState((prevState: State) => ({
//                 ...prevState,
//                 errors: errors,
//             }));
//         } else {
//             const content = await request.json();
//             console.log(content);

//             this.setState((prevState: State) => ({
//                 ...prevState,
//                 errors: {},
//             }));

//             this.redirectToLogin();
//         }
//     };

//     handleInputOnChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ): void => {
//         event.preventDefault();

//         const key = event.target.name;
//         const value = event.target.value;

//         this.setState((prevState: State) => ({
//             ...prevState,
//             [key]: value,
//         }));
//     };

//     render() {
//         return (
//             <div className={styles.gridMain}>
//                 <h1 className="text-center mt-3 mb-sm-5">Register</h1>
//                 <Form noValidate onSubmit={this.handleOnSubmit}>
//                     <Container fluid>
//                         <Form.Group
//                             as={Row}
//                             controlId="formAlerts"
//                             className="justify-content-md-center"
//                         >
//                             <Col sm={9}>
//                                 <Alerts
//                                     alertHeading="Ut-oh! Errors!"
//                                     messages={this.state.errors}
//                                     variant="danger"
//                                     className="p-1 mb-sm-4 text-center"
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group
//                             as={Row}
//                             controlId="formUsername"
//                             className="justify-content-md-center"
//                         >
//                             <Form.Label column sm={2}>
//                                 Username
//                             </Form.Label>
//                             <Col sm={6}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Username"
//                                     name="username"
//                                     value={this.state.username}
//                                     onChange={this.handleInputOnChange}
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group
//                             as={Row}
//                             controlId="formEmail"
//                             className="justify-content-md-center"
//                         >
//                             <Form.Label column sm={2}>
//                                 Email
//                             </Form.Label>
//                             <Col sm={6}>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Email"
//                                     name="email"
//                                     value={this.state.email}
//                                     onChange={this.handleInputOnChange}
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group
//                             as={Row}
//                             controlId="formPassword"
//                             className="justify-content-md-center"
//                         >
//                             <Form.Label column sm={2}>
//                                 Password
//                             </Form.Label>
//                             <Col sm={6}>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Password"
//                                     name="passwordOne"
//                                     value={this.state.passwordOne}
//                                     onChange={this.handleInputOnChange}
//                                     autoComplete="new-password"
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group
//                             as={Row}
//                             controlId="formPassword"
//                             className="justify-content-md-center"
//                         >
//                             <Form.Label column sm={2}>
//                                 Confirm Password
//                             </Form.Label>
//                             <Col sm={6}>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     name="passwordTwo"
//                                     value={this.state.passwordTwo}
//                                     onChange={this.handleInputOnChange}
//                                     autoComplete="new-password"
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group
//                             as={Row}
//                             className="justify-content-md-center"
//                         >
//                             <Col sm={{ span: 6, offset: 2 }}>
//                                 <Button type="submit">Register</Button>
//                                 <Form.Text className="mt-3">
//                                     Already registered? Sign in{" "}
//                                     <Link to="/login">here</Link>!
//                                 </Form.Text>
//                             </Col>
//                         </Form.Group>
//                     </Container>
//                 </Form>
//             </div>
//         );
//     }
// }

export default withRouter(RegisterFn);
