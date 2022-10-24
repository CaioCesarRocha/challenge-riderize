import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/resolver";

const port = process.env.PORT || 4000;

const server = new ApolloServer({ 
    resolvers, 
    typeDefs,
    context : req => ({
        req
    })
});

server.listen( {port} , () => console.log(`Server runs at: http://localhost:${port}`));
