import { ApolloServer } from 'apollo-server'

import typeDefs from './schema.graphql'
import { LaunchAPI } from './datasources/launch'
import { UserAPI } from './datasources/user'
import { resolvers } from './resolvers'

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources() {
    return {
      launchAPI: new LaunchAPI(),
      userAPI  : new UserAPI(),
    }
  },
  playground   : true,
  introspection: true,
})