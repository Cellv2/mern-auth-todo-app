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

    // TODO: Add some UI feedback on successful/failed password update
    const requestPasswordUpdate = async (): Promise<void> => {
        if (!props.token) {
            console.error("You must be signed in");
            return;
        }

        try {
            const token = props.token as string;
            const passwordUpdate = { password: inputVal };

            const request = await fetch(`/api/user/password/updatePassword`, {
                method: "PUT",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(passwordUpdate),
            });

            const response = await request;
            if (!response.ok) {
                throw new Error(
                    `The response code (${response.status}) did not indicate success. The response was ${response.statusText}`
                );
            }

            console.log("Password updated successfully");
        } catch (error) {
            console.error(error);
        }
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
