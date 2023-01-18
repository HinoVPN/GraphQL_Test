import { getModelForClass, pre, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field,ID,InputType,ObjectType } from "type-graphql";
import { Base, NField } from "./base";
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
    @NField() @prop({required: true}) name: string;
    @NField() @prop({required: true}) email: string;
    @NField() @prop({required: true}) password: string;
    @NField() @prop() phone: string;
    @NField() @prop() country: string;
}

@InputType()
export class UserInput implements Partial<User>{
    @NField() name: string;
    @NField() phone: string;
    @NField() email: string;
    @NField() password: string;
    @NField() country: string;
}

export const UserModel = getModelForClass(User);



