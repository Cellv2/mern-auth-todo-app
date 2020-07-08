import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import {
    isAuthenticatedSelector,
    themeSelector,
    updateTheme,
    tokenSelector,
} from "../../app/user-slice";

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
    const theme = useSelector(themeSelector);
    const token = useSelector(tokenSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useDispatch();

    // const { isAuthenticated, theme } = props.applicationState;
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
        // const currentTheme = props.applicationState.theme;
        const currentTheme = theme;
        const newTheme: AvailableThemes =
            currentTheme !== "light" ? "light" : "dark";

        if (isAuthenticated && token !== null) {
            // const token = props.applicationState.user?.token as string;
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
        dispatch(updateTheme(newTheme));

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
                ${theme === "light" ? styles.light : styles.dark}
                ${theme === "light" ? styles.moveLight : ""}
                `}
            ></div>
            {/* <div
                className={`
                ${styles.toggle}
                ${initialTheme === "light" ? styles.light : styles.dark}
                ${currentTheme === "light" ? styles.moveLight : ""}
                `}
            ></div> */}
        </button>
    );
};

export default ThemeSwitch;
