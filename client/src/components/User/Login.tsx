// import React from "react";

// type Props = {};

// const Login = (props: Props) => {
//     return (
//         <div>
//             <h1>This is the login page</h1>
//             <p>Definiately a work in process atm!</p>
//         </div>
//     );
// };

// export default Login;

import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";

type Props = {};
type State = {
    email: string;
    username: string;
    password: string;
};

class Login extends Component<Props, State> {
    state: State = {
        email: "",
        username: "",
        password: "",
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

    handleOnSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const body = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        const request = await fetch(`/api/users/addUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        const content = await request.json();
        console.log(content);
    };

    render() {
        return (
            <div className={styles.gridMain}>
                <form onSubmit={this.handleOnSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputOnChange}
                        />
                    </div>
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
