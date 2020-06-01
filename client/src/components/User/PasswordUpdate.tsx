import React, { useState } from "react";

import { UserToken } from "../../types/application-state.types";

type Props = {
    token: string | UserToken | undefined;
};

const PasswordUpdate = (props: Props) => {
    const [inputVal, setInputVal] = useState<string>("");

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputVal(event.target.value);
    };

    const handleInputOnKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            requestPasswordUpdate();
        }
    };

    const requestPasswordUpdate = () => {
        console.log("requestPasswordUpdate");
    };

    return (
        <>
            <input
                value={inputVal}
                onChange={handleInputOnChange}
                onKeyDown={handleInputOnKeyDown}
                placeholder={"Please enter your new password"}
            ></input>
            <button onClick={requestPasswordUpdate}>Submit</button>
        </>
    );
};

export default PasswordUpdate;
