import { HttpLink, InMemoryCache } from 'apollo-boost'
import { withData } from 'next-apollo'
import { resolvers, typeDefs } from '../resolvers'

const windowGlobal = typeof window !== 'undefined' && window

const link = new HttpLink({
  uri    : 'http://localhost:3000/api/main',
  headers: {
    authorization: windowGlobal
      ? windowGlobal.localStorage.getItem('token')
      : '',
  },
})

// can also be a function that accepts a `context` object (SSR only) and
// returns a config
const config = {
  link,
  typeDefs,
  resolvers,
  createCache: () => {
    const cache = new InMemoryCache()

    cache.writeData({
      data: {
        isLoggedIn: !!(windowGlobal &&
                       windowGlobal.localStorage.getItem('token')),
        cartItems : [],
      },
    })

    return cache
  },
}

export default withData(config)
