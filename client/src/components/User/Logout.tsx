import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";

import styles from "./Logout.module.scss";

interface Props extends RouteComponentProps {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
}

const Logout = (props: Props) => {
    // TODO: Remove token from local storage if going down that route

    const redirectToLogin = () => {
        const { history } = props;
        if (history) {
            history.push("/login");
        }
    };

    const handleOnClick = () => {
        let newAppState = props.applicationState;
        newAppState.isAuthenticated = false;
        newAppState.user = null;
        newAppState.username = null;

        props.handleAppStateUpdate(newAppState, "updateUserState");

        redirectToLogin();
    };

    return (
        <div className={styles.grid}>
            <h1>This is the logout page</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    );
};

export default withRouter(Logout);
