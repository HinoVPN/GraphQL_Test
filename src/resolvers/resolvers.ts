import { NoticeResolver } from "./noticeResolver";
import {UserResolver} from "./userResolver";

export const resolvers = [UserResolver,NoticeResolver] as const