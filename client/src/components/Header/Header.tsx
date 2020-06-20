import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import HeaderProfile from "./HeaderProfile";
import NavLinks from "./NavLinks";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";

import styles from "./Header.module.scss";

type Props = {
    applicationState: ApplicationState;
    isAuthenticated: boolean;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

const Header = (props: Props) => {
    return (
        <Container fluid className={styles.gridHeader}>
            <Navbar
                variant={
                    props.applicationState.theme === "dark" ? "dark" : "light"
                }
            >
                <Navbar.Brand as={Link} to="/">
                    MERN ToDo
                </Navbar.Brand>
                <NavLinks />
                <Nav.Item>
                    <ThemeSwitch
                        applicationState={props.applicationState}
                        handleAppStateUpdate={props.handleAppStateUpdate}
                    />
                </Nav.Item>
                <HeaderProfile />
            </Navbar>
        </Container>
    );
};

export default Header;
