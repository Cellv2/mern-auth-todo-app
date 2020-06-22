import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { AvailableThemes } from "../../types/theme.types";
import { ApplicationState } from "../../types/application-state.types";
import { UpdateStateActions } from "../../types/state-action.types";

import styles from "./ThemeSwitch.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

const ThemeSwitch = (props: Props) => {
    const { isAuthenticated, theme } = props.applicationState;
    const [initialTheme, setInitialTheme] = useState<AvailableThemes>(theme);
    const [currentTheme, setCurrentTheme] = useState<AvailableThemes>(theme);

    useEffect(() => {
        setInitialTheme(theme);
        setCurrentTheme(theme);
    }, []);

    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    const handleThemeSwitch = async (): Promise<void> => {
        const currentTheme = props.applicationState.theme;
        const newTheme: AvailableThemes =
            currentTheme !== "light" ? "light" : "dark";

        if (props.applicationState.isAuthenticated) {
            const token = props.applicationState.user?.token as string;
            const payload = {
                theme: newTheme,
            };

            const request = await fetch(`/api/user/profile`, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(payload),
            });

            const response = await request.json();
            console.log(response);
        }

        let newState = props.applicationState;
        newState.theme = newTheme;

        props.handleAppStateUpdate(newState, "updateThemeState");

        return;
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
                ${currentTheme === "light" ? styles.moveLight : ""}
                `}
            ></div>
        </button>
    );
};

export default ThemeSwitch;
