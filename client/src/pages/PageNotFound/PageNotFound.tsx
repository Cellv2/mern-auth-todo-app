import React from "react";
import { Link } from "react-router-dom";

import styles from './PageNotFound.module.scss'

type Props = {};

const PageNotFound = (props: Props) => {
    return <div className={styles.grid}>
        <h1>Page not found</h1>
        <Link to="/">Go back home</Link>
    </div>;
};

export default PageNotFound;
