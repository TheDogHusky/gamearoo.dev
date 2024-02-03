import Route from "../structures/route";
import {Logger} from "@classycrafter/super-logger";
import Application from "../structures/app";
import { StaffData, DiscordStatusColors } from "../utils/typings";
import { ActivityType } from "discord.js";
import {Snowflake} from "discord-api-types/v10";

export default class StaffRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/staff"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", async (req, res) => {
            const guild = this.app._client.guilds.cache.get(this.app.config.discordData.guildId) || await this.app._client.guilds.fetch(this.app.config.discordData.guildId);
            let staffList: Snowflake[] | undefined = this.app._cache.get("staffList");
            if (!staffList) {
                // reduce time by caching the staffList instead of always calling a filter and cache.has function which is known on Discord.js issues for taking a lot of time
                staffList = (await guild.members.fetch()).filter(m => m.roles.cache.has(this.app.config.discordData.staffRoleId)).map(m => m.id);
                this.app._cache.set("staffList", staffList);
            }

            const discordStatusColor: DiscordStatusColors = {
                online: "#3BA55C",
                dnd: "#ED4245",
                idle: "#FAA61A",
                stream: "#593695",
                offline: "#747F8D",
                invisible: "#747F8D"
            }

            let staffData: StaffData[] | undefined = this.app._cache.get("staffData");
            if (!staffData) {
                staffData = [];
                for (const staff of staffList) {
                    const user = guild.members.cache.get(staff) || await guild.members.fetch(staff);
                    const customActivity = user.presence?.activities.find(a => a.type === ActivityType.Custom);
                    const customStatus = customActivity?.state || "This user does not have any custom status for now.";
                    const avatar = user.avatarURL({ extension:"webp" }) || user.displayAvatarURL({ extension: "webp" });
                    staffData.push({
                        staff: user,
                        highestRole: user.roles.highest,
                        avatar: avatar,
                        customStatus: customStatus,
                        hasCustomStatus: !(customStatus === "This user does not have any custom status for now."),
                        status: {
                            color: discordStatusColor[user.presence?.status as string] || discordStatusColor.invisible,
                            name: user.presence?.status
                        }
                    });
                }

                staffData.sort((x, y) => y.staff.roles.highest.position - x.staff.roles.highest.position);

                this.app._cache.set("staffData", staffData);
            }

            res.render("staff", { title: "Staff", data: staffData });
        });
    };
}