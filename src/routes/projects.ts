import Route from "../structures/route";
import {Logger} from "@classycrafter/super-logger";
import path from "path";
import Application from "../structures/app";

export default class ProjectsRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/projects"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "..", "..", "web", "projects.html"));
        });
    };
}