import express from 'express';
import {Logger} from "@classycrafter/super-logger";
import {IInfos} from "../utils/typings";
import Application from "./app";

export default abstract class Route {

    public router: express.Router;
    public path: string;
    public app: Application;

    protected constructor(logger: Logger, infos: IInfos, app: Application) {
        this.router = express.Router();
        this.path = infos.path;
        this.app = app;

        this.initializeRoutes();
    };

    abstract initializeRoutes(): void;
}