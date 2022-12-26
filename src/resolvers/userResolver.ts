import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {User, UserInput, UserModel} from "../class/userSchema";
const bcrypt = require('bcrypt');

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
        @Arg("_id") _id: string
    ) {
        return UserModel.findById(_id).exec()
    }

    @Query(() => User)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hashSync(password, salt)
        bcrypt.compare(password, hash, function(err:any, res:any) {
            // console.log(res)
        })

        let result = UserModel.find({email: email}).lean()

        console.log(result)
        return result
    }

    @Query(() => [User])
    async allUser() {   
        return UserModel.find().lean()
    }

}
