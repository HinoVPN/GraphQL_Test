import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";

export function NField(func: Function | any = undefined,extra: any = {}){
    if(func instanceof Function){
        return Field(func,{nullable: true, ...extra})
    }else{
        return Field({nullable: true, ...func, ...extra})
    }
}

@ObjectType({description: "Base Schema"})
export abstract class Base{
    @NField((type: any) => Date) @prop({default:() => new Date(), required: true}) createdAt: Date
    @NField((type: any) => Date) @prop({default:() => new Date(), required: true}) lastUpdateAt: Date
    @Field() @prop({default: false, required: true}) deleted: boolean
    @NField() @prop({default: null}) deletedAt: Date
    @Field(type => ID) readonly _id: ObjectId;
}