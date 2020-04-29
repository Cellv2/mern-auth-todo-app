import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import About from "../About";
import User from "../User/User";
import Login from "..//User/Login";
import Logout from "..//User/Logout";

type Props = {};

const Header = (props: Props) => {
    return (
        <div>
            This is the header
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/user">User</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </nav>
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
                        <Route path="/">
                            {/* <Home /> */}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default Header;
