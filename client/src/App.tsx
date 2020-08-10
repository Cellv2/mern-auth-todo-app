import React from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import Main from "./components/Main";
import About from "./pages/About/About";
import UserProfile from "./pages/UserProfile/UserProfile";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Toasts from "./components/Notifications/Toasts";

import { isAuthenticatedSelector, themeSelector } from "./app/user-slice";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.scss";

const App = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const theme = useSelector(themeSelector);

    return (
        <Router>
            <div className={theme}>
                <Layout>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/profile">
                            <UserProfile />
                            {/* The below will be used later on, remove this when the UserProfile page is done */}
                            {/* {!this.state.isAuthenticated ? (
                                <Redirect to="/login" />
                                ) : (
                                    <UserProfile />
                                )} */}
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            {isAuthenticated ? <Redirect to="/" /> : <Login />}
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path="">
                            <PageNotFound />
                        </Route>
                    </Switch>
                    <Toasts />
                </Layout>
            </div>
        </Router>
    );
};

export default App;
