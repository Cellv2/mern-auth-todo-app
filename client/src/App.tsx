import React from "react";

import Layout from "./layouts/Layout";
import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";

import "./App.css";

const App = () => {
    return (
        <Layout>
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
