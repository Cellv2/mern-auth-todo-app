import React from "react";

import styles from "./About.module.scss";

type Props = {};

const About = (props: Props) => {
    return (
        <div className={styles.grid}>
            <h1>This is the about page</h1>
            <p>Add a short description of the techs used</p>
        </div>
    );
};

export default About;
