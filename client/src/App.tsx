import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Main from "./components/Main";
import About from "./components/About";
import User from "./components/User/User";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";

import { ApplicationState } from "../types/application-state-types";

type Props = {};

class App extends Component<Props, ApplicationState> {
    state: ApplicationState = {
        user: "App state user",
    };

    handleAppStateUpdate = (newState: ApplicationState) => {
        console.log("clicky!");
        console.log(newState);
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
                            <User />
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
