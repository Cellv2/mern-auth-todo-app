import app from "./app";

/**
 * Start express server
 */

const server = app.listen(app.get("server_port"), () => {
    console.log(`Server is running on port ${app.get("server_port")}`);
});

export default server;
