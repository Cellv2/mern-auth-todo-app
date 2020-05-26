import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { updateUser, updateUserActions } from "./actions/update-user.action";
import { updateTheme, updateThemeActions } from "./actions/update-theme.action";
import { updateItems, updateItemsActions } from "./actions/update-items.action";

import Layout from "./layouts/Layout";
import Main from "./components/Main";
import About from "./components/About";
import UserProfile from "./components/User/UserProfile";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";
import PageNotFound from "./pages/PageNotFound";

import { ApplicationState } from "./types/application-state.types";
import { UpdateStateActions } from "./types/state-action.types";

type Props = {};

class App extends Component<Props, ApplicationState> {
    // TODO: Add errors in here
    state: ApplicationState = {
        isAuthenticated: false,
        user: {
            username: "",
            token: "",
        },
        theme: "dark",
        items: [
            {
                isComplete: false,
                text: "This is a test item, delete me",
            },
        ],
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
            updatedState = updateItems(this.state, {
                type: updateItemsActions.SET_ITEMS,
                payload: newState,
            });
        }

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

        console.log(updatedState);
        this.setState(updatedState);
    };

    render() {
        return (
            <Router>
                <Layout
                    isAuthenticated={this.state.isAuthenticated}
                    theme={this.state.theme}
                >
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/profile">
                            <UserProfile
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                            {/* The below will be used later on, remove this when the UserProfile page is done */}
                            {/* {!this.state.isAuthenticated ? (
                                <Redirect to="/login" />
                            ) : (
                                <UserProfile
                                    applicationState={this.state}
                                    handleAppStateUpdate={
                                        this.handleAppStateUpdate
                                    }
                                />
                            )} */}
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
                        <Route exact path="/">
                            <Main
                                applicationState={this.state}
                                handleAppStateUpdate={this.handleAppStateUpdate}
                            />
                        </Route>
                        <Route path="">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;
