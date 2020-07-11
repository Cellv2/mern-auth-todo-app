import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import PasswordUpdate from "../../components/User/PasswordUpdate";

import {
    usernameSelector,
    isAuthenticatedSelector,
    tokenSelector,
    logoutUser,
} from "../../app/user-slice";
import { itemsSelector } from "../../app/item-slice";

import styles from "./UserProfile.module.scss";

interface Props extends RouteComponentProps {}

const UserProfile = (props: Props) => {
    const items = useSelector(itemsSelector);
    const username = useSelector(usernameSelector);
    const token = useSelector(tokenSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useDispatch();

    const redirectToHome = () => {
        const { history } = props;
        if (history) {
            history.push("/");
        }
    };

    const handleDeleteUser = async (
        event: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        // TODO: If this fails, say so through the UI
        if (isAuthenticated && token !== null) {
            const randomInts = Array.from(new Array(5)).map(() =>
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
                    // const { items } = props.applicationState;

                    // // "_id" should only exist if it came from the DB in the first place, so we filter these out
                    // const unsavedItems = items.filter(
                    //     (item) => !("_id" in item)
                    // );

                    // let newAppState = props.applicationState;
                    // newAppState.isAuthenticated = false;
                    // newAppState.user = null;
                    // newAppState.username = null;
                    // newAppState.items = unsavedItems;

                    // props.handleAppStateUpdate(newAppState, "updateUserState");

                    // dispatch(updateAuthenticated(false));
                    // dispatch(updateUsername(null));
                    // dispatch(updateToken(null));
                    dispatch(logoutUser());

                    // TODO: make sure that we remove items from state too

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
                <h1>Hey, {username ?? "how did you get here?"}</h1>
                <p>
                    <em>
                        {items.length
                            ? `You have ${items.length} items on your to do list - get on with it!`
                            : "There's nothing on your to do list? Go add something!"}
                    </em>
                </p>
                {token !== null && (
                    <>
                        <Alert>
                            <Alert.Heading>Update Password</Alert.Heading>
                            <p>
                                If you'd like to update your password, please
                                use the input below
                            </p>
                            <PasswordUpdate token={token} />
                        </Alert>
                        <Alert variant="danger">
                            <Alert.Heading>Delete Account</Alert.Heading>
                            <p>
                                Here be danger! Click below to delete your
                                account
                            </p>
                            <Button variant="danger" onClick={handleDeleteUser}>
                                Delete User
                            </Button>
                        </Alert>
                    </>
                )}
            </Container>
        </div>
    );
};

export default withRouter(UserProfile);
