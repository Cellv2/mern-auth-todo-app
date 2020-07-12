import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { themeSelector, updateUserAsync } from "../../app/user-slice";

import { AvailableThemes } from "../../types/theme.types";

import styles from "./ThemeSwitch.module.scss";
import { UserPartial } from "../../types/user.types";

type Props = {};

const ThemeSwitch = (props: Props) => {
    const theme = useSelector(themeSelector);
    const dispatch = useDispatch();

    const [initialTheme, setInitialTheme] = useState<AvailableThemes>(theme);

    useEffect(() => {
        setInitialTheme(theme);
    }, []);

    const handleThemeSwitch = async (): Promise<void> => {
        const newTheme: AvailableThemes = theme !== "light" ? "light" : "dark";

        const update: UserPartial = { theme: newTheme };
        dispatch(updateUserAsync(update));
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
                className={`
                ${styles.toggle}
                ${initialTheme === "light" ? styles.light : styles.dark}
                ${theme === "light" ? styles.moveLight : ""}
                `}
            ></div>
        </button>
    );
};

export default ThemeSwitch;
