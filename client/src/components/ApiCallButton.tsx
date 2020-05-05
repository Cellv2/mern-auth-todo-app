import React from "react";

type Props = {};

const ApiCallButton = (props: Props) => {
    const handleKekRequest = () => {
        console.log("GET request was clicked");
        fetch(`/api/kek`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleGetAllRequest = async () => {
        const response = await fetch(`/api/users/todos`);

        const content = await response.json();
        console.log(content);
    };

    const handlePostRequest = async () => {
        const testJson = { isCompleted: false, text: "This is from the test POST button" };

        const response = await fetch(`/api/users/todos`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(testJson),
        });

        const content = await response.json();
        console.log(content);
    };

    const handlePutRequest = async () => {
        const testJson = { userid: 3 };

        const response = await fetch(`/api/users/todos/1`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(testJson),
        });

        const content = await response.json();
        console.log(content);
    };

    return (
        <>
            <div>This is the API call</div>
            <button onClick={handleKekRequest}>GET kek request</button>
            <button onClick={handleGetAllRequest}>
                GET all todos request - Check the console
            </button>
            <button onClick={handlePostRequest}>
                POST request - Check the console
            </button>
            <button onClick={handlePutRequest}>
                PUT request - Check the console
            </button>
        </>
    );
};

export default ApiCallButton;
