import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import {Notice, NoticeInput, NoticeModel} from "../class/noticeSchema";
import { User, UserModel } from "../class/userSchema";

@Resolver((of) => Notice)
export class NoticeResolver{
    constructor() {}

    @FieldResolver(()=>User)
    async user(@Root() notice: Notice): Promise<User>{
        return await UserModel.findById(notice["_doc"].userId).lean()
    }

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
    async findNoticeByUserId(
        @Arg("user_id") user_id: string
    ) {   
        let result:any = await NoticeModel.find({userId: user_id})
        return result
    }


    @Query(() => Notice)
    async findNoticeById(
        @Arg("notice_id") notice_id: string
    ) {   
        let result:any = await NoticeModel.findById({_id: notice_id})
        console.log(result)
        return result
    }


    @Query(() => [Notice])
    async allNotice() {
        return await NoticeModel.find({})
    }


    
}
