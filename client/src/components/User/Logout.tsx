import React from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";
import { updateAuthenticated, updateUsername } from "../../app/user-slice";

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

    const dispatch = useDispatch();

    const redirectToLogin = () => {
        const { history } = props;
        if (history) {
            history.push("/login");
        }
    };

    const handleOnClick = () => {
        const { items } = props.applicationState;

        // "_id" should only exist if it came from the DB in the first place, so we filter these out
        const unsavedItems = items.filter((item) => !("_id" in item));

        let newAppState = props.applicationState;
        newAppState.isAuthenticated = false;
        newAppState.user = null;
        newAppState.username = null;
        newAppState.items = unsavedItems;

        props.handleAppStateUpdate(newAppState, "updateUserState");

        dispatch(updateAuthenticated(false));
        dispatch(updateUsername(null));

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
