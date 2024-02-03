import Route from "../structures/route";
import {Logger} from "@classycrafter/super-logger";
import Application from "../structures/app";

export default class PrivacyRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/privacy"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", (req, res) => {
            res.render("privacy", { title: "Privacy Policy" });
        });
    };
}