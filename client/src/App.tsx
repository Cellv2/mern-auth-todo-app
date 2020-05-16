import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { updateUser, updateUserActions } from "./actions/update-user.action";
import { updateTheme, updateThemeActions } from "./actions/update-theme.action";

import Layout from "./layouts/Layout";
import Main from "./components/Main";
import About from "./components/About";
import User from "./components/User/User";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";

import { ApplicationState } from "./types/application-state.types";
import { UpdateStateActions } from "./types/state-action.types";

type Props = {};

class App extends Component<Props, ApplicationState> {
    // TODO: Add errors in here
    state: ApplicationState = {
        isAuthenticated: false,
        user: "App state user",
        theme: "dark",
    };

    /**
     * Core function to update application state
     * @param {ApplicationState} newState The already updated state object to merge into application state
     * @param {UpdateStateActions} actionToTake The type of action that will be called
     */

    handleAppStateUpdate = (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => {
        let updatedState: ApplicationState = this.state;

        if (actionToTake === "updateUserState") {
            updatedState = updateUser(this.state, {
                type: updateUserActions.SET_USER,
                payload: newState,
            });
        }

        if (actionToTake === "updateThemeState") {
            updatedState = updateTheme(this.state, {
                type: updateThemeActions.SET_THEME,
                payload: newState,
            });
        }

        this.setState(updatedState);
    };

    render() {
        return (
            <Router>
                <Layout isAuthenticated={this.state.isAuthenticated}>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/user">
                            <User
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                        </Route>
                        <Route path="/logout">
                            <Logout
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                        </Route>
                        <Route path="/" exact>
                            <Main
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;
