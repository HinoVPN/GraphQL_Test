import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {Notice, NoticeInput, NoticeModel} from "../class/noticeSchema";
import { UserModel } from "../class/userSchema";
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
        return NoticeModel.aggregate([
            {
                $match: { type: type },   
            },
            {
                $lookup:{
                    from: 'users',
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])
        // return NoticeModel.find({type: type}).lean()
    }

    @Query(() => [Notice])
    async findNoticeByUserId(
        @Arg("user_id") user_id: string
    ) {   

        let result = await NoticeModel.aggregate([
            {
                $match: { userId: ObjectId(user_id) },   
            },
            {
                $lookup:{
                    from: UserModel.collection.name,
                    pipeline:[
                        {
                            $match: { _id: ObjectId(user_id)}  
                        }
                    ],
                    as: "user"
                }
            }
        ])

        console.log(result)

        return result
        // return NoticeModel.find({userId:ObjectId(user_id)}).lean()
    }


    @Query(() => [Notice])
    async findNoticeById(
        @Arg("notice_id") notice_id: string
    ) {   
        return NoticeModel.aggregate([
            {
                $match: { _id: ObjectId(notice_id) },   
            },
            {
                $lookup:{
                    from: 'users',
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])
        // return NoticeModel.find({type: type}).lean()
    }


    @Query(() => [Notice])
    async allNotice() {   
        return NoticeModel.aggregate([
            {
                $lookup:{
                    from: UserModel.collection.name,
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])
    }
}
