import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ApiCallButton from "./ApiCallButton";
import ToDoContainer from "./ToDoContainer";
import About from "./About";
import User from "./User/User";
import Login from "./User/Login";
import Logout from "./User/Logout";

import styles from "./Main.module.scss";

type Props = {};

const Main = (props: Props) => {
    return (
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    <ApiCallButton />
                    <ToDoContainer />
                </header>
            </div>
    );
};

export default Main;
