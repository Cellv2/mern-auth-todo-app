import React from "react";

type Props = {
    handleCreateOnClick: () => void;
};

const ToDoCreate: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            Create an item
            <button onClick={props.handleCreateOnClick}>Click this to create</button>
        </div>
    );
};

export default ToDoCreate;
