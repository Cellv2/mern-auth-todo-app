import React from "react";

import { Link } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
    return (
        <>
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
                </div>
            </div>
            <div className={styles.profileDropdown}>
                <ProfileDropdown />
            </div>
        </>
    );
};

export default Header;
