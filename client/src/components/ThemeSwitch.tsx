import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { AvailableThemes } from "../types/theme.types";

import styles from "./ThemeSwitch.module.scss";

type Props = {};

// TODO: Make nicer transition between the dark/light toggle
const ThemeSwitch = (props: Props) => {
    const [theme, setTheme] = useState<AvailableThemes>("light");

    const handleThemeSwitch = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <button className={styles.container} onClick={handleThemeSwitch}>
            <FontAwesomeIcon
                icon={faMoon}
                className={styles.moon}
                size={"3x"}
            />
            <FontAwesomeIcon icon={faSun} className={styles.sun} size={"3x"} />
            <div
                className={
                    theme === "light"
                        ? `${styles.toggle} ${styles.light}`
                        : `${styles.toggle} ${styles.dark}`
                }
            ></div>
        </button>
    );
};

export default ThemeSwitch;
