import chalk from "chalk";
import {APIGuildMember, Snowflake, RESTGetAPIGuildMemberResult, RESTGetAPIGuildRolesResult, APIRole, Routes} from "discord-api-types/v10";
import {REST} from "@discordjs/rest";
import config from "../config";

const rest = new REST().setToken(config.discordData.botToken);

export const getMs = (start: [number, number]): string => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString();
};

export const timingColor = (ms: number | string): string => {
    let msnum: number;
    if(typeof ms === "string") msnum = parseInt(ms);
    else msnum = ms;

    if(msnum < 100) return chalk.green(ms + "ms");
    else if(msnum < 500) return chalk.yellow(ms + "ms");
    else return chalk.red(ms + "ms");
};

const isConstructorProxyHandler = {
    construct() {
        return Object.prototype;
    }
};

export const isConstructor = (func: any, _class: any): boolean => {
    try {
        new new Proxy(func, isConstructorProxyHandler)();
        if (!_class) return true;
        return func.prototype instanceof _class;
    } catch (err) {
        return false;
    }
};

export const isGoodStatus = (code: number): boolean => {
    return code >= 200 && code < 400;
}

export class HTMLError extends Error {
    public code: number;
    constructor(message: string, code: number | string) {
        super(message);
        this.code = Number(code);
    }
}

export const fetchUser = async (id: Snowflake): Promise<APIGuildMember> => await rest.get(Routes.guildMember(config.discordData.guildId, id)) as RESTGetAPIGuildMemberResult;

export const fetchRole = async (id: Snowflake, user: APIGuildMember): Promise<APIRole> => {
    const roles = await rest.get(Routes.guildRoles(config.discordData.guildId)) as RESTGetAPIGuildRolesResult;
    let userRoles: APIRole[] = roles.filter(role => user.roles.includes(role.id)) as APIRole[];
    const found = userRoles.find(role => role.id === id);
    if (!found) {
        throw new Error("User does not have a role with ID " + id);
    }
    return found;
}
export const getHighestRole = (roles: APIRole[]): APIRole => {
    let highest = roles[0];
    for (const role of roles) {
        if (role.position > highest.position) highest = role
    }

    return highest;
}

export const formatActivity = (activity: number): string => {
    let result: string;
    switch(activity) {
        case 0:
            result = "Playing ";
            break;
        case 1:
            result = "Streaming ";
            break;
        case 2:
            result = "Listening to ";
            break;
        case 3:
            result = "Watching ";
            break;
        case 5:
            result = "Competing in ";
            break;
        default:
            result = "";
            break;
    }

    return result;
}