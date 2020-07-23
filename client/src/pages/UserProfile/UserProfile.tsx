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
    deleteUserAsync,
} from "../../app/user-slice";
import { itemsSelector } from "../../app/item-slice";
import { useAppDispatch } from "../../app/store";

import styles from "./UserProfile.module.scss";

interface Props extends RouteComponentProps {}

const UserProfile = (props: Props) => {
    const items = useSelector(itemsSelector);
    const username = useSelector(usernameSelector);
    const token = useSelector(tokenSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const appDispatch = useAppDispatch();

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
        if (!isAuthenticated || !token) {
            return;
        }

        const randomInts = Array.from(new Array(5)).map(() =>
            Math.floor(Math.random() * 10)
        );
        const randomString = randomInts.join("-");

        const input = prompt(
            `Please enter ${randomString} to confirm account deletion`
        );

        if (input === randomString) {
            appDispatch(deleteUserAsync()).then((bool) => {
                if (bool) {
                    redirectToHome();
                }
            });
        } else {
            // TODO: Show that the numbers are wrong through the UI
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
