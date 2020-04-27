import React from "react";

import ToDoItem from "./ToDoItem";

type Props = {};

const ToDoForm = (props: Props) => {
    return (
        <div>
            This is the ToDoForm
            {[...new Array(4)]
                .map((val, index) => `${index}`)
                .map((item) => {
                    const text: string = `This is item: ${item}`;
                    return <ToDoItem key={+item} text={text} />;
                })}
        </div>
    );
};

export default ToDoForm;
