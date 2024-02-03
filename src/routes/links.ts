import Route from "../structures/route";
import {Logger} from "@classycrafter/super-logger";
import config from "../config";
import Application from "../structures/app";

export default class LinksRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/l/"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.redirect("/");
        });

        this.router.get("/support", (req, res) => {
            res.redirect(config.discordInvite);
        });

        this.router.get("/contact", (req, res) => {
            res.redirect("mailto://support@" + config.domainName);
        });
    };
}