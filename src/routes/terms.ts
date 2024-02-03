import Route from "../structures/route";
import {Logger} from "@classycrafter/super-logger";
import Application from "../structures/app";

export default class TermsRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/terms"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.render("terms", { title: "Terms" });
        });
    };
}