const port = 80;
const host = "localhost";
const name = "Gamearoo's Development";
const copyrightDates = "2023-2024";
const domainName = "gamearoo.dev";
const discordInvite = "https://discord.gg/UZDBg5Sr45";
const useAppNameForLogging = false;
const loggingName = "Gamearoodev";
const discordData = {
    botToken: "",
    guildId: "1068088656377692170",
    staffRoleId: "1173089212229226556",
    botRoleId: "1144728664202821713",
    privateBotRoleId: "1198354807216414830",
    publicBotRoleId: "1198354834777194580",
    botList: [
        {
            type: "public",
            id: "564579659526832178",
            version: "18.2.4",
            description: ""
        },
        {
            type: "private",
            id: "1125949058515738654",
            version: "0.1.0",
            description: "A music bot that once was public, but after Discord's ToS update blocking music bots became private."
        },
        {
            type: "public",
            id: "1144718992632717365",
            version: "unknown"
        },
        {
            type: "public",
            id: "1034976795444916334",
            version: "unknown"
        },
        {
            type: "private",
            id: "1192533913386623137",
            version: process.env.npm_package_version || "unknown",
            description: "Support bot used as a connection between the gamearoo.dev website and Discord."
        },
        {
            type: "private",
            id: "1170227642281246750",
            version: "unknown",
            description: "A support bot for Gamearoo's Community."
        },
        {
            type: "public",
            id: "1150253891238232135",
            version: "1.0.0-beta4"
        }
    ]
};

export default {
    port,
    host,
    name,
    copyrightDates,
    domainName,
    discordInvite,
    useAppNameForLogging,
    loggingName,
    discordData
}