// TODO: Add logic for prod/dev env
//import dotenv from "dotenv";

import { HOST_NAME_DEV, SERVER_PORT_DEV } from "../../env";
import "dotenv/config";

const prod: boolean = false;

let url: string;
let server_port: number;

if (prod) {
    console.error(
        "THIS IS IN PRODUCTION - This literally should never have been possible!"
    );
    url = "";
    server_port = 5000;
} else {
    url = HOST_NAME_DEV;
    server_port = SERVER_PORT_DEV;
}

export const HOST_URL = url;
export const SERVER_PORT = server_port;

// JWT
export const secretOrKey = <string>process.env.SECRET_OR_KEY;
