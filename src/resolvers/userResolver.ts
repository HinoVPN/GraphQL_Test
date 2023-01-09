import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import {User, UserInput, UserModel} from "../class/userSchema";
const bcrypt = require('bcrypt');


@Resolver((of) => User)
export class UserResolver{
    constructor() {}

    @Mutation(() => User)
    async addUser(
        @Arg("userInfo") userInfo: UserInput
    ) {
        const currentUser = await UserModel.find({email:userInfo.email})
        if (currentUser){
            throw new Error('User Email Duplicate');
        }
        const user = new UserModel()
        for (let key in userInfo){
            user[key] = userInfo[key]
        }
        return (await UserModel.create(user)).save()
    }

    @Query(() => User)
    async findUser(
        @Arg("_id") _id: string
    ) {
        return UserModel.findById(_id).exec()
    }

    @Mutation(() => User)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        let result = await UserModel.findOne({email: email}).lean()
        if(await bcrypt.compare(password, result?.password))
            return result
        throw new Error("Login Failed")
    }

    @Query(() => [User])
    async allUser() {   
        return UserModel.find().lean()
    }


}
