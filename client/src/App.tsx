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

import { ApplicationState } from "./types/application-state-types";
import { StateAction, UpdateStateActions } from "./types/state-action-types";

type Props = {};

class App extends Component<Props, ApplicationState> {
    state: ApplicationState = {
        user: "App state user",
        theme: "dark",
    };

    handleAppStateUpdate = (
        newState: ApplicationState,
        actionToTake: UpdateStateActions
    ) => {
        console.log("clicky!");
        console.log(newState);
        console.log(actionToTake);

        // TODO: Find a nicer way to set the state action

        let updatedState: ApplicationState = this.state;

        if (actionToTake === "updateUserState") {
            updatedState = updateUser(this.state, {
                type: updateUserActions.SET_USER,
                payload: newState,
            } as StateAction);
        }

        if (actionToTake === "updateThemeState") {
            updatedState = updateTheme(this.state, {
                type: updateThemeActions.SET_THEME,
                payload: newState,
            });
        }

        this.setState(updatedState, () => {
            console.log("NEW STATE");
            console.dir(this.state);
        });
    };

    render() {
        return (
            <Router>
                <Layout>
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
                            <Logout />
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
