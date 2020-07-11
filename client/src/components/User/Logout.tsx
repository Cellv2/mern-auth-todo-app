import React from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { logoutUser } from "../../app/user-slice";
import { removeItemsOnLogout } from "../../app/item-slice";

import styles from "./Logout.module.scss";

interface Props extends RouteComponentProps {}

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
        dispatch(logoutUser());
        dispatch(removeItemsOnLogout());

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
