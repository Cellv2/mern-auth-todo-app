import React from "react";

import styles from "./About.module.scss";

type Props = {};

const About = (props: Props) => {
    return (
        <div className={styles.grid}>
            <h1>This is the about page</h1>
            <p>Add a short description of the techs used</p>

            <div className={styles.flexContainer}>
                <div className={styles.flexItem}>
                    <img src="http://placehold.it/300" alt="" />
                    <p>MongoDB</p>
                </div>
                <div className={styles.flexItem}>
                    <img src="http://placehold.it/300" alt="" />
                    <p>Express.js</p>
                </div>
                <div className={styles.flexItem}>
                    <img src="http://placehold.it/300" alt="" />
                    <p>React.js</p>
                </div>
                <div className={styles.flexItem}>
                    <img src="http://placehold.it/300" alt="" />
                    <p>Node.js</p>
                </div>
                <div className={styles.flexItem}>
                    <img src="http://placehold.it/300" alt="" />
                    <p>TypeScript</p>
                </div>
            </div>
        </div>
    );
};

export default About;
