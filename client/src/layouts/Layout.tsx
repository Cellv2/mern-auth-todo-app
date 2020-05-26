import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { AvailableThemes } from "../types/theme.types";

import styles from "./Layout.module.scss";

type Props = {
    isAuthenticated: boolean;
    theme: AvailableThemes;
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className={styles.grid}>
            <Header
                isAuthenticated={props.isAuthenticated}
                theme={props.theme}
            />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;
