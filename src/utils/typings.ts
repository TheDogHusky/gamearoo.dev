import {GuildMember, Role, PresenceStatus, ActivityOptions, ClientPresence} from "discord.js";
import {Snowflake} from "discord-api-types/v10";

export interface IInfos {
    path: string;
}

export type StaffData = {
    staff: GuildMember;
    highestRole: Role;
    avatar: string;
    customStatus: string;
    hasCustomStatus: boolean;
    status: {
        color: string;
        name: PresenceStatus | undefined;
    };
}

export type BotData = {
    bot: GuildMember;
    avatar: string;
    customStatus: string;
    description: string;
    version: string;
    hasDescription: boolean;
    type: string;
    typeColor: string;
    inviteLink: string;
    customStatusType: string;
    hasVersion: boolean;
    hasCustomStatus: boolean;
    status: {
        color: string;
        name: PresenceStatus | undefined;
    };
}

export type BotInfo = {
    type: string; // Private, Public
    id: Snowflake;
    version: string;
    description?: string;
}

export type DiscordStatusColors = {
    [index: string]: string;
    offline: string;
    invisible: string;
    dnd: string;
    idle: string;
    stream: string;
}

export type BotColors = {
    [index: string]: string;
    private: string;
    public: string;
}