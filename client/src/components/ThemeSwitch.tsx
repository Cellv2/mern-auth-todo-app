import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { AvailableThemes } from "../types/theme.types";
import { ApplicationState } from "../types/application-state.types";
import { UpdateStateActions } from "../types/state-action.types";

import styles from "./ThemeSwitch.module.scss";

type Props = {
    applicationState: ApplicationState;
    handleAppStateUpdate: (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => void;
};

// TODO: Make nicer transition between the dark/light toggle
const ThemeSwitch = (props: Props) => {
    const handleThemeSwitch = (): void => {
        const currentTheme = props.applicationState.theme;
        const newTheme: AvailableThemes =
            currentTheme !== "light" ? "light" : "dark";

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
                className={
                    props.applicationState.theme === "light"
                        ? `${styles.toggle} ${styles.light}`
                        : `${styles.toggle} ${styles.dark}`
                }
            ></div>
        </button>
    );
};

export default ThemeSwitch;
