import React, { Component, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";

import Alerts from "../Alerts/Alerts";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";
import {
    updateAuthenticated,
    updateTheme,
    updateUsername,
    updateToken,
    loginUserAsync,
} from "../../app/user-slice";

import styles from "./Login.module.scss";

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

type Errors = {
    [key: string]: string;
};

const LoginRedux = (props: Props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});
    const dispatch = useDispatch();

    const redirectToHome = () => {
        const { history } = props;
        if (history) {
            history.push("/");
        }
    };

    const handleOnSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        const request = await fetch(`/api/users/login`, {
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

            // TODO: Also save token into local storage on login ?
            console.log(jwtDecode(content.token));

            console.log(content);
            setErrors({});

            // let newAppState = props.applicationState;
            // newAppState.user = content;
            // newAppState.isAuthenticated = true;
            // newAppState.theme = content.theme;
            // newAppState.username = content.username;

            // props.handleAppStateUpdate(newAppState, "updateUserState");
            // dispatch(updateTheme(content.theme));
            // dispatch(updateAuthenticated(true));
            // dispatch(updateUsername(content.username));
            // dispatch(updateToken(content.token));

            // must wait for this to finish before redirecting else items will not load when first hitting the home page
            await dispatch(loginUserAsync(email, password));

            redirectToHome();
        }

        return;
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

        return;
    };

    return (
        <div className={styles.gridMain}>
            <h1 className="text-center mt-3 mb-sm-5">Sign in</h1>
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

// class Login extends Component<Props, State> {
//     state: State = {
//         email: "",
//         password: "",
//         errors: {},
//     };

//     redirectToHome = () => {
//         const { history } = this.props;
//         if (history) {
//             history.push("/");
//         }
//     };

//     handleOnSubmit = async (
//         event: React.FormEvent<HTMLFormElement>
//     ): Promise<void> => {
//         event.preventDefault();

//         const body = {
//             email: this.state.email,
//             password: this.state.password,
//         };

//         const request = await fetch(`/api/users/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json;charset=utf-8" },
//             body: JSON.stringify(body),
//         });

//         if (!(await request.ok)) {
//             const errors = await request.json();
//             console.log(errors);
//             this.setState((prevstate: State) => ({
//                 ...prevstate,
//                 errors: errors,
//             }));
//         } else {
//             const content = await request.json();

//             // TODO: Also save token into local storage on login ?
//             console.log(jwtDecode(content.token));

//             console.log(content);

//             this.setState((prevState: State) => ({
//                 ...prevState,
//                 errors: {},
//             }));

//             let newAppState = this.props.applicationState;
//             newAppState.user = content;
//             newAppState.isAuthenticated = true;
//             newAppState.theme = content.theme;
//             newAppState.username = content.username;

//             this.props.handleAppStateUpdate(newAppState, "updateUserState");

//             this.redirectToHome();
//         }

//         return;
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

//         return;
//     };

//     render() {
//         return (
//             <div className={styles.gridMain}>
//                 <h1 className="text-center mt-3 mb-sm-5">Sign in</h1>
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
//                                     name="password"
//                                     value={this.state.password}
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
//                                 <Button type="submit">Sign in</Button>
//                                 <Form.Text className="mt-3">
//                                     Not registered yet? Click{" "}
//                                     <Link to="/register">here</Link>!
//                                 </Form.Text>
//                             </Col>
//                         </Form.Group>
//                     </Container>
//                 </Form>
//             </div>
//         );
//     }
// }

export default withRouter(LoginRedux);
