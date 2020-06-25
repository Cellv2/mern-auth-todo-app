import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import PasswordUpdate from "../../components/User/PasswordUpdate";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";
import { AvailableThemes } from "../../types/theme.types";

import styles from "./UserProfile.module.scss";

interface Props extends RouteComponentProps {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
}

const UserProfile = (props: Props) => {
    const redirectToHome = () => {
        const { history } = props;
        if (history) {
            history.push("/");
        }
    };

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
        const { isAuthenticated, user } = props.applicationState;
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
                    redirectToHome();
                });

                return;
            }
        }
    };

    return (
        <div className={styles.gridMain}>
            <Container className="text-center">
                <h1>
                    Hey,{" "}
                    {props.applicationState.username ?? "how did you get here?"}
                </h1>
                <p>
                    <em>
                        {props.applicationState.items.length
                            ? `You have ${props.applicationState.items.length} items on your to do list - get on with it!`
                            : "There's nothing on your to do list? Go add something!"}
                    </em>
                </p>
                {props.applicationState.user?.token && (
                    <>
                        <Alert variant="info">
                            <Alert.Heading>Update Password</Alert.Heading>
                            <p>
                                If you'd like to update your password, please
                                use the input below
                            </p>
                            <PasswordUpdate
                                token={props.applicationState.user.token}
                            />
                        </Alert>
                        <Alert variant="danger">
                            <Alert.Heading>Delete Account</Alert.Heading>
                            <p>
                                Here be danger! Click below to delete your
                                account
                            </p>
                            <button onClick={handleDeleteUser}>
                                Delete User
                            </button>
                        </Alert>
                    </>
                )}
            </Container>
        </div>
    );
};

export default withRouter(UserProfile);
