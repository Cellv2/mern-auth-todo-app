import React from "react";

type Props = {
    text: string;
};

const ToDoItem = (props: Props) => {
    return (
        <div>
            {props.text}
        </div>
    );
};

export default ToDoItem;
