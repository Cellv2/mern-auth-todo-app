import React from "react";

type Props = {
    text: string;
    index: number;
    handleDeleteOnClick: (index: number) => void;
};

const ToDoItem: React.FunctionComponent<Props> = (props: Props) => {
    const { text, index, handleDeleteOnClick } = props;
    return (
        <div>
            {text}
            <button onClick={() => handleDeleteOnClick(index)}>Click this to delete</button>
        </div>
    );
};

export default ToDoItem;
