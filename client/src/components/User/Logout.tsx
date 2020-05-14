import React from "react";

import { ApplicationState } from "../../types/application-state-types";
import { UpdateStateActions } from "../../types/state-action-types";

import styles from "./Logout.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

const Logout = (props: Props) => {
    // TODO: Remove token from local storage if going down that route

    const handleOnClick = () => {
        console.log("clicky");

        let newAppState = props.applicationState;
        newAppState.isAuthenticated = false;
        newAppState.user = null;

        props.handleAppStateUpdate(newAppState, "updateUserState");
    };

    return (
        <div className={styles.grid}>
            <h1>This is the logout page</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    );
};

export default Logout;
