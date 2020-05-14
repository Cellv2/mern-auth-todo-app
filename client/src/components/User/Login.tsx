import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";

import styles from "./Login.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

type State = {
    email: string;
    password: string;
    errors?: {
        email?: string;
        password?: string;
    };
};

class Login extends Component<Props, State> {
    state: State = {
        email: "",
        password: "",
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

        if ((await request.status) === 400) {
            const errors = await request.json();
            this.setState((prevstate: State) => ({
                ...prevstate,
                errors: errors,
            }));
        } else {
            const content = await request.json();

            // TODO: Also save token into local storage on login ?
            console.log(jwtDecode(content.token));

            console.log(content);

            let newAppState = this.props.applicationState;
            newAppState.user = content;
            newAppState.isAuthenticated = true;

            this.props.handleAppStateUpdate(newAppState, "updateUserState");
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

        return;
    };

    render() {
        return (
            <div className={styles.gridMain}>
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
            </div>
        );
    }
}

export default Login;
