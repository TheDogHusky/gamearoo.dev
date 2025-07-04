import Route from "../structures/route";
import { Logger } from "@classycrafter/super-logger";
import Application from "../structures/app";
import { BotColors, BotData, BotInfo, DiscordStatusColors } from "../utils/typings";
import { formatActivity } from "../utils";

export default class StaffRoute extends Route {

    constructor(logger: Logger, app: Application) {
        super(logger, {
            path: "/bots"
        }, app);
    };

    public initializeRoutes() {
        this.router.get("/", async (req, res) => {
            let botList: BotInfo[] | undefined = this.app.config.discordData.botList;

            const discordStatusColor: DiscordStatusColors = {
                online: "#3BA55C",
                dnd: "#ED4245",
                idle: "#FAA61A",
                stream: "#593695",
                offline: "#747F8D",
                invisible: "#747F8D"
            }

            const botColor: BotColors = {
                private: "#ED4245",
                public: "#747F8D"
            }

            let botData: BotData[] | undefined = this.app._cache.get("botData");
            if (!botData) {
                botData = [];
                const guild = this.app._client.guilds.cache.get(this.app.config.discordData.guildId) || await this.app._client.guilds.fetch(this.app.config.discordData.guildId);
                for (const bot of botList) {
                    if (bot.id === "1192533913386623137") bot.version = process.env.npm_package_version || "unknown"; // Support bot version
                    const user = guild.members.cache.get(bot.id) || await guild.members.fetch(bot.id);
                    const customActivity = user.presence?.activities[0] || { name: "This bot does not have any custom activity.", type: 111 };
                    const customStatus = customActivity.name as string;
                    const botDescription = bot.description || "No description has been added to this bot for now."
                    const avatar = user.avatarURL({ extension:"webp" }) || user.displayAvatarURL({ extension: "webp" });
                    var invite = `https://discord.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=8`;
                    if(user.id === "564579659526832178") invite = "https://rambot.xyz"
                    botData.push({
                        bot: user,
                        avatar: avatar,
                        customStatus: customStatus,
                        customStatusType: formatActivity(customActivity.type),
                        description: botDescription,
                        version: bot.version,
                        type: bot.type,
                        inviteLink: invite,
                        typeColor: botColor[bot.type],
                        hasVersion: !(bot.version === "unknown"),
                        hasDescription: !(botDescription === "No description has been added to this bot for now."),
                        hasCustomStatus: !(customStatus === "This bot does not have any custom activity."),
                        status: {
                            color: discordStatusColor[user.presence?.status as string] || discordStatusColor.invisible,
                            name: user.presence?.status
                        }
                    });
                }

                this.app._cache.set("botData", botData);
            }

            res.render("bots", { title: "Bots", data: botData });
        });

        this.router.get("/apply", (req, res) => {
            res.redirect("/l/support");
        });
    };
}