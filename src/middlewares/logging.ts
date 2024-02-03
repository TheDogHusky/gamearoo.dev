import express from "express";
import * as utils from "../utils";
import {Logger} from "@classycrafter/super-logger";

export default function (logger: Logger) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next();
        const ms = utils.getMs(process.hrtime());
        if (!utils.isGoodStatus(res.statusCode)) return logger.warn(`${req.method} @${req.path} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
        logger.info(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
    };
};