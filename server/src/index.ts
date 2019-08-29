import { ApolloServer } from 'apollo-server-micro'

import typeDefs from './schema.graphql'
import { LaunchAPI } from './datasources/launch'
import { UserAPI } from './datasources/user'
import { resolvers } from './resolvers'
import { Database, Store } from './database'
import isEmail from 'isemail'

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context      : async ({ req }) => {
    // simple auth check on every request
    const auth  = (req.headers && req.headers.authorization) || ''
    const email = Buffer.from(auth, 'base64').toString('ascii')
    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) {
      return { user: null }
    }
    // find a user by their email
    const users = await new Store<Database.IUser>('users').findOrCreate({ email })
    const user  = users && users[0] ? users[0] : null

    return { user }
  },
  dataSources() {
    return {
      launchAPI: new LaunchAPI(),
      userAPI  : new UserAPI(),
    }
  },
  playground   : true,
  introspection: true,
})