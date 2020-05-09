import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.scss";

type Props = {};

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

        if ((await request.status) === 400) {
            const errors = await request.json();
            console.log(errors);

            this.setState((prevState: State) => ({
                ...prevState,
                errors: errors,
            }));
        } else {
            const content = await request.json();
            console.log(content);
        }
    };

    handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
                <div>This is the register page</div>
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
                </form>
            </div>
        );
    }
}

export default Register;
