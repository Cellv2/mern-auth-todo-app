import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import NavProfile from "./NavProfile";
import NavLinks from "./NavLinks";

import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";
import { themeSelector } from "../../app/user-slice";

import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
    const themeRedux = useSelector(themeSelector);

    return (
        <Container fluid className={styles.gridHeader}>
            <Navbar
                variant={themeRedux === "dark" ? "dark" : "light"}
                collapseOnSelect
                expand="sm"
            >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand as={Link} to="/">
                    MERN ToDo
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavLinks />
                    <Nav.Item>
                        <ThemeSwitch />
                    </Nav.Item>
                    <NavProfile />
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;
