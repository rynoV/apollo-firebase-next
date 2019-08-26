import { ApolloServer } from 'apollo-server'

import typeDefs from './schema.graphql'

export const server = new ApolloServer({
  typeDefs,
  playground   : true,
  introspection: true,
})