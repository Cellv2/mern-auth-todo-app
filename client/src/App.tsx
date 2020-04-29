import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";
import About from "./components/About";
import Login from "./components/Login";

import "./App.css";
import Home from "./components/Home";

const App = () => {
    return (
        <>
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
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/login">
                            <Login />
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
        </>
    );
};

export default App;
