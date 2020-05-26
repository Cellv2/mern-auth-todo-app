import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { AvailableThemes } from "../types/theme.types";

import styles from "./ThemeSwitch.module.scss";

type Props = { theme: AvailableThemes };

// TODO: Make nicer transition between the dark/light toggle
const ThemeSwitch = (props: Props) => {
    // const [theme, setTheme] = useState<AvailableThemes>("light");

    // useEffect(() => {
    //     setTheme(props.theme);
    // }, []);

    const handleThemeSwitch = () => {
        // theme === "light" ? setTheme("dark") : setTheme("light");
        // TODO: Pass the change up the tree
    };

    const { theme } = props;

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
