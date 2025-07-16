import * as bots from "../data/bots.json";
import * as projects from "../data/projects.json";
import * as mods from "../data/mods.json";
import { config } from "dotenv";
config();

const port = 3000;
const host = process.env.HOST || "localhost"; // Use environment variable or default to localhost
const domainName = process.env.DOMAIN || "gamearoo.dev"; // Use environment variable or default to gamearoo.dev
const discordInvite = process.env.DISCORD_INVITE || "";
const discordData = {
    botToken: process.env.TOKEN || "",
    guildId: "1068088656377692170",
    staffRoleId: "1173089212229226556",
    botRoleId: "1144728664202821713",
    privateBotRoleId: "1198354807216414830",
    publicBotRoleId: "1198354834777194580",
    botList: bots as Array<{
        id: string;
        type: "private" | "public";
        description?: string;
        version: string;
    }>
};

export default {
    port,
    host,
    domainName,
    discordInvite,
    discordData,
    projects: projects as Array<{
        name: string;
        description: string;
        image: string;
        links: Array<{
            name: string;
            url: string;
        }>
    }>,
    mods: mods as Array<{

    }>
}