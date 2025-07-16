import Route from "../structures/route";
import { Logger } from "@classycrafter/super-logger";
import Application from "../structures/app";

export default class ProjectsRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/mods"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.render("mods", {
                title: "Projects",
                description: "A collection of mods created by the Gamearoo team.",
                mods: this.app.config.mods
            });
        });
    };
}