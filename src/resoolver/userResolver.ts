import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {User, UserInput, UserModel} from "../class/userSchema";
@Resolver(User)
export class UserResolver{
    constructor() {}

    @Mutation(() => User)
    async addUser(
        @Arg("userInfo") userInfo: UserInput
    ) {
        const user = new UserModel()
        for (let key in userInfo){
            user[key] = userInfo[key]
        }
        return (await UserModel.create(user)).save()
    }

    @Query(() => User)
    async findUser(
        @Arg("_id") id: string
    ) {
        // return this.users.find((user:User) => user.id == id);
    }

    @Query(() => [User])
    async allUser() {   
        return UserModel.find().lean()
        // return this.users
    }
}
