import React from "react";

import EditableText from "./EditableText";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";
import { AvailableThemes } from "../../types/theme.types";

import styles from "./UserProfile.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

const UserProfile = (props: Props) => {
    const handleOnClick = async (theme: AvailableThemes): Promise<void> => {
        if (props.applicationState.isAuthenticated) {
            const token = props.applicationState.user?.token as string;
            const payload = {
                theme: theme,
            };

            const request = await fetch(`/api/user/profile`, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(payload),
            });

            const response = await request.json();
            console.log(response);
        }

        // update the theme locally as well, just in case we're not logged in
        let newState = props.applicationState;
        newState.theme = theme;

        props.handleAppStateUpdate(newState, "updateThemeState");
    };

    const handleDeleteUser = async (
        event: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        const { isAuthenticated, user, username } = props.applicationState;
        const token = props.applicationState.user?.token as string;

        // TODO: If this fails, say so through the UI
        if (isAuthenticated && user) {
            const randomInts = Array.from(new Array(5)).map((item) =>
                Math.floor(Math.random() * 10)
            );
            const randomString = randomInts.join("-");

            const input = prompt(
                `Please enter ${randomString} to confirm account deletion`
            );

            if (input === randomString) {
                // TODO: log user out and send them back to home page (also make sure that the todo items go away)
                const request = await fetch(`/api/user/deleteUser`, {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                    },
                });

                await request.json().then((deletedUser) => {
                    const { items } = props.applicationState;

                    // "_id" should only exist if it came from the DB in the first place, so we filter these out
                    const unsavedItems = items.filter(
                        (item) => !("_id" in item)
                    );

                    let newAppState = props.applicationState;
                    newAppState.isAuthenticated = false;
                    newAppState.user = null;
                    newAppState.username = null;
                    newAppState.items = unsavedItems;

                    props.handleAppStateUpdate(newAppState, "updateUserState");

                    console.log("User deleted", deletedUser);
                });

                return;
            }
        }
    };

    return (
        <div className={styles.grid}>
            <h1>This is the user page</h1>
            <p>The current theme is: {props.applicationState.theme}</p>
            <button onClick={() => handleOnClick("dark")}>
                Set dark theme
            </button>
            <button onClick={() => handleOnClick("light")}>
                Set light theme
            </button>
            <hr />
            <EditableText initialText={"Test"} />
            <br />
            <div style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <p>Danger</p>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
    );
};

export default UserProfile;
