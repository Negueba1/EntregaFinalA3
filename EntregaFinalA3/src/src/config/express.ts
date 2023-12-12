import express from "express";
import morgan from "morgan";
import { router } from "../routes/index";
import cors from "cors";

export const createServer = (): express.Application => {
    const app = express();
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors({
        origin: '*'
    }));    

    app.use("/api/v1", router);

    return app;
}