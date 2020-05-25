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

    handleIsEditableOnClick = () => {
        this.setState((prevState: State) => ({
            ...prevState,
            isEditable: !this.state.isEditable,
        }));
    };

    render() {
        return (
            <>
                isEditable : {`${this.state.isEditable}`}
                {this.state.isEditable ? (
                    <p>Is editable</p>
                ) : (
                    <div>
                        The state text is: {this.state.text}
                        <br />
                    </div>
                )}
                <button onClick={this.handleIsEditableOnClick}>Edit</button>
            </>
        );
    }
}

export default EditableText;
