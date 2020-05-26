import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { AvailableThemes } from "../types/theme.types";

import styles from "./ThemeSwitch.module.scss";

type Props = {};

const ThemeSwitch = (props: Props) => {
    const [theme, setTheme] = useState<AvailableThemes>("light");
    return (
        <button className={styles.container}>
            <FontAwesomeIcon
                icon={faMoon}
                className={styles.moon}
                size={"3x"}
            />
            <FontAwesomeIcon icon={faSun} className={styles.sun} size={"3x"} />
            <div className={`${styles.toggle} ${styles.dark}`}></div>
        </button>
    );
};

export default ThemeSwitch;
