import { getModelForClass, pre, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field,ID,InputType,ObjectType } from "type-graphql";
import { Base } from "./base";
import { User } from "./userSchema";


@ObjectType({description: "Notice Schema"})
export class Notice extends Base{
    @Field() @prop() userId: string;
    @Field(type => [User]) @prop({ref: () => User}) user: Ref<User>;
    @Field() @prop() title: string;
    @Field() @prop() type: string;
    @Field() @prop() lostDate: Date;
    @Field({nullable: true}) @prop() foundDate: Date;
    @Field({nullable: true}) @prop() found_user_id: string;
    @Field() @prop() description: string;
    @Field() @prop() venue: string;
    @Field() @prop() contact: string;
    @Field({nullable: true}) @prop() imageDir: string;
}


@InputType()
export class NoticeInput {
    @Field({nullable: true}) _id: string;
    @Field() userId: string;
    @Field() title: string;
    @Field() type: string;
    @Field() lostDate: Date;
    @Field({nullable: true}) foundDate: Date;
    @Field({nullable: true}) found_user_id: string;
    @Field() description: string;
    @Field() venue: string;
    @Field() contact: string;
    @Field({nullable: true}) imageDir: string;
}

export const NoticeModel = getModelForClass(Notice);