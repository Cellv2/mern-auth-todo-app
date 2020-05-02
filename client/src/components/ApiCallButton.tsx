import React from "react";

type Props = {};

const ApiCallButton = (props: Props) => {
    const handleGetRequest = () => {
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

    const handlePostRequest = async () => {
        const testJson = { isCompleted: false, text: "Yes" };

        const rawResponse = await fetch(`/api/users/todos`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(testJson),
        });

        const content = await rawResponse.json();
        console.log(content);
    };

    return (
        <>
            <div>This is the API call</div>
            <button onClick={handleGetRequest}>
                GET request - Check the console
            </button>
            <button onClick={handlePostRequest}>
                POST request - Check the console
            </button>
        </>
    );
};

export default ApiCallButton;
