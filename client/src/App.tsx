import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";
import About from "./components/About";
// import Home from "./components/Home";
import User from "./components/User/User";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";

import "./App.css";
import Home from "./components/Home";
import Layout from "./layouts/Layout";

const App = () => {
    return (
        <Layout>
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
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
            <div className="App">
                <header className="App-header">
                    <ApiCallButton />
                    <ToDoContainer />
                </header>
            </div>
        </Layout>
    );
};

export default App;
