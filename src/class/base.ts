import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({description: "Base Schema"})
export abstract class Base{
    @Field(type => Date) @prop({default:() => new Date(), required: true}) createdAt: Date
    @Field(type => Date) @prop({default:() => new Date(), required: true}) lastUpdateAt: Date
    @Field() @prop({default: false, required: true}) deleted: boolean
    @Field() @prop({default: null}) deletedAt: Date
    @Field(type => ID,{nullable: true}) readonly _id: ObjectId;
}