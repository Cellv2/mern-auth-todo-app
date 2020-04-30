import React from "react";

import Layout from "./layouts/Layout";
import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";

import styles from "./App.module.scss";

const App = () => {
    return (
        <Layout>
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    <ApiCallButton />
                    <ToDoContainer />
                </header>
            </div>
        </Layout>
    );
};

export default App;
