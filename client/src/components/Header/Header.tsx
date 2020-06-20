import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

import ProfileDropdown from "./ProfileDropdown";
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
        // <>
        //     <div className={styles.logo}>
        //         <Link to="/">Home from logo</Link>
        //     </div>
        //     <div className={styles.header}>
        //         This is the header
        //         <div>
        //             <nav>
        //                 <ul className={styles.links}>
        //                     <li>
        //                         <Link to="/">Home</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/about">About</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/profile">User Profile</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/register">Register</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/login">Login</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/logout">Logout</Link>
        //                     </li>
        //                 </ul>
        //             </nav>
        //         </div>
        //     </div>
        //     <div className={styles.profileDropdown}>
        //         <ProfileDropdown isAuthenticated={props.isAuthenticated} />
        //         <ThemeSwitch
        //             applicationState={props.applicationState}
        //             handleAppStateUpdate={props.handleAppStateUpdate}
        //         />
        //     </div>
        // </HeaderProfile>
    );
};

export default Header;
