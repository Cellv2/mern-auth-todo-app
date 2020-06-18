import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

import ProfileDropdown from "./ProfileDropdown";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

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
        <Nav
            fill
            variant="pills"
            defaultActiveKey="home-page"
            className={styles.gridHeader}
        >
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="home-page">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/about" eventKey="about-page">
                    About
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item as={Link} to="/login" eventKey="sign-in-page">
                    Sign In
                </NavDropdown.Item>
                <NavDropdown.Item
                    as={Link}
                    to="/register"
                    eventKey="register-page"
                >
                    Register
                </NavDropdown.Item>
                <NavDropdown.Item
                    as={Link}
                    to="/profile"
                    eventKey="profile-page"
                >
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout" eventKey="logout-page">
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
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
        // </>
    );
};

export default Header;
