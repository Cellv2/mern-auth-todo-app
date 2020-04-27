import React, { Component } from "react";

type Props = {
    handleCreateOnClick: (inText: string) => void;
};
type State = {
    input: string;
};

class ToDoCreate extends React.Component<Props, State> {
    state = {
        input: "",
    };

    handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.persist();

        this.setState((prevState: State) => ({
            ...prevState,
            input: event.target.value,
        }));

        return;
    };

    handleSubmitOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        // TODO: Set up hook into a global error state manager so errors can be shown elsewhere?
        if (this.state.input !== "") {
            this.props.handleCreateOnClick(this.state.input);
        } else {
            console.log("Woah there, you don't have anything in the input!");
        }

        return;
    };

    render() {
        return (
            <div>
                Create an item
                <input
                    type="text"
                    placeholder="Please enter your item text here"
                    value={this.state.input}
                    onChange={this.handleInputOnChange}
                />
                <button onClick={this.handleSubmitOnClick}>
                    Click this to create
                </button>
            </div>
        );
    }
}

export default ToDoCreate;
