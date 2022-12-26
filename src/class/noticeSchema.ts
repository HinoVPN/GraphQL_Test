import { getModelForClass, pre, prop, Ref } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { ObjectId } from "mongoose";
import { Field,ID,InputType,ObjectType } from "type-graphql";
import { Base } from "./base";
import { User } from "./userSchema";


@ObjectType({description: "Notice Schema"})
export class Notice extends Base{
    @Field(type => User) @prop({ref: () => User,type: () => String}) userId: Ref<User, string>;
    @Field() @prop() title: string;
    @Field() @prop() type: string;
    @Field() @prop() loseDate: Date;
    @Field() @prop() foundDate: Date;
    @Field() @prop() found_user_id: string;
    @Field() @prop() descirption: string;
    @Field() @prop() venue: string;
    @Field() @prop() contact: string;
    @Field() @prop() imageDir: string;
}


@InputType()
export class NoticeInput {
    @Field({nullable: true}) _id: string;
    @Field() userId: string;
    @Field() title: string;
    @Field() type: string;
    @Field() loseDate: Date;
    @Field({nullable: true}) foundDate: Date;
    @Field({nullable: true}) found_user_id: string;
    @Field() descirption: string;
    @Field() venue: string;
    @Field() contact: string;
    @Field({nullable: true}) imageDir: string;
}

export const NoticeModel = getModelForClass(Notice);