import React, { Component } from "react";

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

    render() {
        return <div>This is the register page</div>;
    }
}

export default Register;
