import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import About from "../About";
import User from "../User/User";
import Login from "..//User/Login";
import Logout from "..//User/Logout";
import ProfileDropdown from "./ProfileDropdown";
import Main from "../Main";

import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
    return (
        <>
            {/* <Router> */}
                <div className={styles.logo}>
                    <Link to="/">Home from logo</Link>
                </div>
                <div className={styles.header}>
                    This is the header
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/user">User</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </ul>
                        </nav>
                        {/* <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/user">
                                <User />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/logout">
                                <Logout />
                            </Route>
                            <Route path="/" exact>
                                <Main />
                            </Route>
                        </Switch> */}

                    </div>
                </div>
                <div className={styles.profileDropdown}>
                    <ProfileDropdown />
                </div>
            {/* </Router> */}
        </>
    );
};

export default Header;
