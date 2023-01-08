import { getModelForClass, pre, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType,ObjectType } from "type-graphql";
import { Base, NField } from "./base";
import { User, UserModel } from "./userSchema";


@ObjectType({description: "Notice Schema"})
export class Notice extends Base{
    @NField() @prop() userId: string;
    @NField((type: any) => User) @prop({ref: () => User,require: true}) user: Ref<User>;
    @NField() @prop() title: string;
    @NField() @prop() type: string;
    @NField() @prop() lostDate: Date;
    @NField({nullable: true}) @prop({default: null}) foundDate: Date;
    @NField({nullable: true}) @prop({default: null}) found_user_id: string;
    @NField() @prop() description: string;
    @NField() @prop() venue: string;
    @NField() @prop() contact: string;
    @NField({nullable: true}) @prop() imageDir: string;
}


@InputType()
export class NoticeInput implements Partial<Notice>{
    @NField() userId: string;
    @NField() title: string;
    @NField() type: string;
    @NField() lostDate: Date;
    @NField() foundDate: Date;
    @NField() found_user_id: string;
    @NField() description: string;
    @NField() venue: string;
    @NField() contact: string;
    @NField() imageDir: string;
}




export const NoticeModel = getModelForClass(Notice);