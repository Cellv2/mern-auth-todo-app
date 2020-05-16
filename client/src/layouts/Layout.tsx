import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import styles from "./Layout.module.scss";

type Props = {
    isAuthenticated: boolean;
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className={styles.grid}>
            <Header isAuthenticated={props.isAuthenticated} />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;
