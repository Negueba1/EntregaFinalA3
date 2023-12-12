import http from "http";
import { createServer } from "./config/express";
import { AddressInfo } from "net";

const port = process.env.PORT || 8000;

const startServer = async () => {
    const app = createServer();

    const server = http.createServer(app).listen({ port }, () => {
        const adressInfo = server.address() as AddressInfo;
        console.log(`🚀 Server is running on http://localhost:${adressInfo.port}`);
    });
}
startServer();