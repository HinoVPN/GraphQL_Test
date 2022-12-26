import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import { resolvers } from "./resolvers/resolvers";

const main = async () => {
    const app = express()

    const server = new ApolloServer({ 
        schema: await buildSchema({
            resolvers: resolvers
        }),
        context: ({req,res}) => ({req,res}),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });

    await server.start();

    server.applyMiddleware({app})

    mongoose.connect(
        `mongodb+srv://Hino:Hino6192001@cluster0.x0glt.mongodb.net/GraphqlTest?retryWrites=true&w=majority`
    ).then(()=>{
        app.listen(4000,() => {
            console.log(`Server ready at localhost:4000/graphql`);
        });
    }).catch((err: any) => {
        console.log(err)
    })
    

}

main().catch((err)=>{
    console.log(err)
})


