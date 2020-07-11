import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import styles from "./Layout.module.scss";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className={styles.grid}>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;
