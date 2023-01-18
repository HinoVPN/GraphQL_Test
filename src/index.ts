import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import { resolvers } from "./resolvers/resolvers";
import Context from "./types/context";
import authChecker from "./utils/authChecker";
import { verifyJwt } from "./middleware/auth";
import { User } from "./class/userSchema";
var cookieParser = require('cookie-parser')
var cors = require('cors')

const main = async () => {
    const app = express()

    app.use(cookieParser())

    const server = new ApolloServer<Context>({ 
        schema: await buildSchema({
            resolvers: resolvers,
            authChecker
        }),
        context: async (ctx:Context) => {
            const context = ctx
            if(ctx.req.cookies.accessToken){
                const user = verifyJwt<User>(ctx.req.cookies.accessToken)
                context.user = user!["_doc"]
            }
            return context
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });

    const corsOptions = {
        credentials: true,
        origin: ['http://localhost:3000',"http://localhost:4000/graphql"]
    }

    app.use(cors(corsOptions))

    await server.start();

    server.applyMiddleware({app,path:"/graphql",cors:false})

    mongoose.connect(
        `mongodb+srv://Hino:Hino6192001@cluster0.x0glt.mongodb.net/GraphqlTest?retryWrites=true&w=majority`
    ).then(()=>{
        app.listen(4000,() => {
            console.log(`Server ready at http://localhost:4000/graphql`);
        });
    }).catch((err: any) => {
        console.log(err)
    })
    

}

main().catch((err)=>{
    console.log(err)
})


