import React, { Component } from "react";

import ToDoForm from "./ToDoForm";

type Props = {};
type State = {};

class ToDoContainer extends Component<Props, State> {
    render() {
        return (
            <div>
                This is the ToDoContainer
                <ToDoForm />
            </div>
        );
    }
}

export default ToDoContainer;
