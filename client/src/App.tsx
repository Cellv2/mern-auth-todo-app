import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";
import Main from "./components/Main";

import About from "./components/About";
import User from "./components/User/User";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";

import styles from "./App.module.scss";

const App = () => {
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
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
