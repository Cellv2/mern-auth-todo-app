import React, { Component } from "react";

type Props = {
    initialText: string;
};
type State = {
    isEditable: boolean;
    text: string;
};

class EditableText extends Component<Props, State> {
    state: State = {
        isEditable: false,
        text: "",
    };

    componentDidMount = () => {
        this.setState({ text: this.props.initialText });
    };

    handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        event.preventDefault();

        this.setState((prevState: State) => ({
            ...prevState,
            text: event.target.value,
        }));
    };

    handleIsEditable = () => {
        this.setState((prevState: State) => ({
            ...prevState,
            isEditable: !this.state.isEditable,
        }));
    };

    // TODO: Pass the value of the component around to whenever it needs to go in the app state / DB
    handleStopEditOnClick = (event: React.FormEvent<HTMLFormElement>) => {


        this.handleIsEditable();
    };

    render() {
        return (
            <>
                isEditable : {`${this.state.isEditable}`}
                {this.state.isEditable ? (
                    <form onSubmit={this.handleStopEditOnClick}>
                        <p>Is editable</p>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleInputOnChange}
                        />
                        <button>Done</button>
                    </form>
                ) : (
                    <div>
                        <p>The state text is: {this.state.text}</p>
                        <button onClick={this.handleIsEditable}>Edit</button>
                    </div>
                )}
            </>
        );
    }
}

export default EditableText;
