import { ApolloServer } from "apollo-server";
import { startStandaloneServer } from "@apollo/server/standalone";

const graphqlServer = new ApolloServer({});

export default graphqlServer;
