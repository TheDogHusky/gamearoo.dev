import Route from "../structures/route";
import { Logger } from "@classycrafter/super-logger";
import Application from "../structures/app";

export default class ProjectsRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/projects"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.render("projects", {
                title: "Projects",
                description: "A collection of projects and tools created by the Gamearoo team.",
                projects: this.app.config.projects
            });
        });
    };
}