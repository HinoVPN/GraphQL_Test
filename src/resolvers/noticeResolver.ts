import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {Notice, NoticeInput, NoticeModel} from "../class/noticeSchema";
const ObjectId = require('mongodb').ObjectID;

@Resolver(Notice)
export class NoticeResolver{
    constructor() {}

    @Mutation(() => Notice)
    async createNotice(
        @Arg("noticeInfo") noticeInfo: NoticeInput
    ) {
        let notice = new NoticeModel()
        for (let key in noticeInfo){
            notice[key] = noticeInfo[key]
        }
        
        return (await NoticeModel.create(notice)).save()
    }

    @Query(() => [Notice])
    async findNoticeByType(
        @Arg("type") type: string
    ) {   
        return NoticeModel.find({type: type}).lean()
    }

    @Query(() => [Notice])
    async findNoticeByUserId(
        @Arg("user_id") user_id: string
    ) {   
        return NoticeModel.find({userId:ObjectId(user_id)}).lean()
    }


    @Query(() => [Notice])
    async allNotice() {   
        return NoticeModel.find().lean()
    }
}
