import { Token } from "graphql";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import {User, UserInput, UserModel} from "../class/userSchema";
import { signJwt } from "../middleware/auth";
import Context from "../types/context";
const bcrypt = require('bcrypt');
const cookie = require('cookie');


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

    @Mutation(() => String)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: Context
    ) {
        let user = await UserModel.findOne({email: email})
        if(!user)
            throw new Error("No user")

        if(context.user){
            throw new Error("Already Login")
        }

        if(!await bcrypt.compare(password, user?.password)){
             throw new Error("Wrong Password")
        }

        let jwt = await signJwt({ ...user })

        context.res.cookie("accessToken", jwt, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        // if(context.req && context.req.headers){
        //     const cookies = cookie.parse(context.req.headers)
        // }

        return jwt
            
    }

    @Mutation(() => String)
    async logout(
        @Ctx() context: Context
    ) {
        let user = await UserModel.findOne({_id: context.user!._id})
        if(!user)
            throw new Error("No user")
        
        context.res.cookie("accessToken", '', {
            maxAge: -1,
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
    
        return "Logout"
    }

    @Query(() => [User])
    async allUser() {   
        return UserModel.find().lean()
    }

    @Query(() => User, {nullable: true})
    me(@Ctx() context: Context){
        return context.user
    }



}
