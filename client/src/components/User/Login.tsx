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
            <form onSubmit={this.handleOnSubmit}>
                <label htmlFor="username">User Name:</label>
                <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleInputOnChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInputOnChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    name="password"
                    type="text"
                    value={this.state.password}
                    onChange={this.handleInputOnChange}
                    autoComplete="new-password"
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Login;
