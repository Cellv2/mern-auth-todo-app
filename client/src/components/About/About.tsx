import React from "react";

import mongoDbLogo from "./mongodb-leaf@4x.png";

import styles from "./About.module.scss";

type Props = {};

const About = (props: Props) => {
    return (
        <div className={styles.grid}>
            <h1>This is the about page</h1>
            <p>Add a short description of the techs used</p>

            <div className={styles.flexContainer}>
                <div className={styles.flexItem}>
                    <div className={styles.logo}>
                        <img src={mongoDbLogo} alt="MongoDB Leaf Logo" />
                    </div>
                    <p>MongoDB</p>
                </div>
                <div className={styles.flexItem}>
                    <div className={styles.logo}>
                        <img src="http://placehold.it/300" alt="" />
                    </div>
                    <p>Express.js</p>
                </div>
                <div className={styles.flexItem}>
                    <div className={styles.logo}>
                        <img src="http://placehold.it/300" alt="" />
                    </div>
                    <p>React.js</p>
                </div>
                <div className={styles.flexItem}>
                    <div className={styles.logo}>
                        <img src="http://placehold.it/300" alt="" />
                    </div>
                    <p>Node.js</p>
                </div>
                <div className={styles.flexItem}>
                    <div className={styles.logo}>
                        <img src="http://placehold.it/300" alt="" />
                    </div>
                    <p>TypeScript</p>
                </div>
            </div>
        </div>
    );
};

export default About;
