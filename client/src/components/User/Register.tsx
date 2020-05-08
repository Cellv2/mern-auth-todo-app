import React, { Component } from "react";
import { Link } from "react-router-dom";

type Props = {};

type State = {
    username: string;
    email: string;
    password: string;
    errors: object;
};

class Register extends Component<Props, State> {
    state = {
        username: "",
        email: "",
        password: "",
        errors: {},
    };

    handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("aweadsawdasd");
    };

    handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const key = event.target.name;
        const val = event.target.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [key]: val,
        }));
    };

    render() {
        return (
            <>
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
            </>
        );
    }
}

export default Register;
