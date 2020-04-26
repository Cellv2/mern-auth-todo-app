import React from "react";

type Props = {};

const ApiCallButton: React.FunctionComponent<Props> = (props: Props) => {
    const handleApiCall = () => {
        console.log("Yeah this was clicked");
        fetch(`/api/kek`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <div>This is the API call</div>
            <button onClick={handleApiCall}>
                Click me and check the console
            </button>
        </>
    );
};

export default ApiCallButton;
