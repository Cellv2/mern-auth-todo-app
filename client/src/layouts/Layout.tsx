import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import About from "../components/About";
import User from "../components/User/User";
import Login from "../components/User/Login";
import Logout from "../components/User/Logout";

import styles from "./Layout.module.scss";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <Router>
            <div className={styles.grid}>
                <Header />
                {props.children}
                <Footer />
            </div>
        </Router>
    );
};

export default Layout;
