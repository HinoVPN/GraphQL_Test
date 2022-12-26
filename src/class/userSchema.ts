import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field,ID,InputType,ObjectType } from "type-graphql";
import { Base } from "./base";
const bcrypt = require('bcrypt');

@ObjectType({description: "User Schema"})
@pre<User>("save", async function(){
    if(!this.isModified('password')){
        return bcrypt
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
})
export class User extends Base{
    @Field() @prop({required: true}) name: string;
    @Field() @prop({required: true}) email: string;
    @Field() @prop({required: true}) password: string;
    @Field() @prop() phone: string;
    @Field() @prop() country: string;
}

@InputType()
export class UserInput {
    @Field({nullable: true}) _id: string;
    @Field() name: string;
    @Field() phone: string;
    @Field() email: string;
    @Field() password: string;
    @Field() country: string;
}

export const UserModel = getModelForClass(User);



