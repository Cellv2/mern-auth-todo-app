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

    const handleCreateNewBadUser = async (): Promise<void> => {
        const body = {
            username: "Test user",
            email: "Test email",
            password: "Super secure password",
        };

        const request = await fetch(`/api/users/addUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        const content = await request.json();
        console.log(content);
    };

    const handleCreateNewUser = async (): Promise<void> => {
        const body = {
            username: "Test user",
            email: "test@email.com",
            password: "Super secure password",
        };

        const request = await fetch(`/api/users/addUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });

        const content = await request.json();
        console.log(content);
    };

    const handleGetAllRequest = async () => {
        const response = await fetch(`/api/users/todos`);

        const content = await response.json();
        console.log(content);
    };

    const handlePostRequest = async () => {
        const testJson = {
            isCompleted: false,
            text: "This is from the test POST button",
        };

        const response = await fetch(`/api/users/1/todos`, {
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
            <button onClick={handleCreateNewBadUser}>POST - new bad user</button>
            <button onClick={handleCreateNewUser}>POST - new user</button>
            <hr />
            <button onClick={handleGetAllRequest}>
                GET all todos request - Check the console
            </button>
            <button onClick={handlePostRequest}>
                POST request - add todo - Check the console
            </button>
            <button onClick={handlePutRequest}>
                PUT request - update first todo to userid 3 - Check the console
            </button>
        </>
    );
};

export default ApiCallButton;
