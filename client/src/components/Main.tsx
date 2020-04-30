import React from "react";

import ApiCallButton from "./ApiCallButton";
import ToDoContainer from "./ToDoContainer";

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
