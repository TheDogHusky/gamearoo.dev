import Route from "../structures/route";
import { Logger } from "@classycrafter/super-logger";
import Application from "../structures/app";

export default class IndexRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.render("index", {
                title: "Home",
                description: "Welcome to Gamearoo's Development services. We provide a range of tools and services to help you.",
            });
        });
    };
}