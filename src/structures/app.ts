import express from "express";
import config from "../config";
import { Logger } from "@classycrafter/super-logger";
import fs from "fs";
import LoggingMiddleware from "../middlewares/logging";
import cors from "cors";
import Route from "./route";
import path from "path";
import * as utils from "../utils";
import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import NodeCache from "node-cache";
import "express-async-errors";

export default class App {
    public app: express.Application;
    public port: number;
    public config: typeof config;
    private _vars = {
        routesLoaded: false,
        middlewaresInitialized: false,
        routesInitialized: false
    };
    public readonly logger: Logger;
    private localeVars = {
        defaultTitle: "Home - Gamearoo's Development",
        appName: "Gamearoo's Development",
        host: config.host,
        port: config.port,
        appIconURL: `/static/images/app-icon.png`,
        copyrightDates: `2023-${new Date().getFullYear()}`,
        domainName: config.domainName,
        email: {
            contactMail: `support@${config.domainName}`,
            abuseMail: `abuse@${config.domainName}`
        }
    }
    public _client: Client;
    public _cache: NodeCache;

    constructor() {
        this.app = express();
        this.port = config.port;
        this.config = config;
        this.logger = new Logger({
            name: "Gamearoodev",
            colored: true,
            timezone: "America/New_York",
            tzformat: 12,
            dirpath: "./logs",
            writelogs: true,
            enablecustom: false
        });
        this._client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences
            ],
        });
        this._cache = new NodeCache({
            stdTTL: 60 * 5,
            checkperiod: 60 * 2
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on the port ${this.port}`, "Loader");
        });
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/static", express.static("web/static"));
        this.app.set("view engine", "ejs");
        this.app.set("views", "web/views");
        this.app.set("host", config.host);
        this.app.use(LoggingMiddleware(this.logger));
        this.app.locals = {
            config: this.config,
            vars: this.localeVars
        }

        this._vars.middlewaresInitialized = true;
    }

    private initializeRoutes(routes: Route[]) {
        if (!this._vars.middlewaresInitialized) {
            this.logger.fatal("Middlewares are not initialized, but routes are trying to be initialized", "Loader");
        }
        if(!this._vars.routesLoaded) {
            this.logger.warn("This might be an error: routes are not loaded, but middlewares are initialized", "Loader");
            this.loadRoutes();
        }

        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });

        this._vars.routesInitialized = true;
    }

    private loadRoutes() {
        if (!this._vars.middlewaresInitialized) {
            this.logger.fatal("Middlewares are not initialized, but routes are trying to be loaded", "Loader");
        }

        const routes: Route[] = [];
        const routeFiles = fs.readdirSync(path.join(__dirname, "..", "routes")).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of routeFiles) {
            const { default: route } = require(`../routes/${file}`);
            if(!utils.isConstructor(route, Route)) {
                this.logger.error(`Route ${file} is not a valid route!`, "App");
                continue;
            }
            const cRoute = new route(this.logger, this);
            routes.push(cRoute);
            this.logger.info(`Loaded route ${cRoute.path}`, "App");
        }

        this._vars.routesLoaded = true;

        return routes;
    }

    private initializeClient() {
        this._client.on("ready", () => {
            this.logger.info(`Connected to Discord through the bot ${this._client.user?.tag}`, "Discord");
            this._client.user?.setPresence({
                status: 'online',
                activities: [{
                    name: "Connected to the website @gamearoo.dev",
                    type: ActivityType.Watching
                }]
            });
        });
        this._client.login(this.config.discordData.botToken).catch(() => {
            this.logger.error(`Discord connection failed; This may cause an outage.`);
        });
    }

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            const err = new utils.HTMLError("Not Found", 404);
            res.status(err.code);
            next(err);
        });

        this.app.use((err: utils.HTMLError, req: any, res: any, next: any) => {
            if (res.statusCode !== 404) this.logger.error(err.stack as string, "App");
            if (res.statusCode >= 200 && res.statusCode < 300) res.status(500);
            res.status(res.statusCode || err.code);
            if (!err.code) err.code = res.statusCode;
            if (res.headersSent) {
                return next(err);
            }
            if (!err.message) err.message = "Internal Server Error";

            if (fs.existsSync(path.join(__dirname, "..", "..", "web", "views", "errors", res.statusCode + ".ejs"))) {
                res.render("errors/" + res.statusCode + ".ejs", {err: err, code: err.code});
            }
            else {
                res.render("errors/global.ejs", {err: err, code: err.code});
            }
        });
    }

    start() {
        this.initializeMiddlewares();
        this.initializeRoutes(this.loadRoutes());
        this.initializeErrorHandling();
        this.listen();
        this.initializeClient();
    }
}