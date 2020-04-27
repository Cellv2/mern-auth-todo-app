import React from "react";
import "./App.css";

import ApiCallButton from "./components/ApiCallButton";
import ToDoContainer from "./components/ToDoContainer";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <ApiCallButton />
                <ToDoContainer />
            </header>
        </div>
    );
};

export default App;
