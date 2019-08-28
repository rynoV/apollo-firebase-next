import { InMemoryCache } from 'apollo-boost'
import { withData } from 'next-apollo'

// can also be a function that accepts a `context` object (SSR only) and
// returns a config
const config = {
  uri  : 'http://localhost:4000/',
  cache: new InMemoryCache().restore(initialState || {}),
}

export default withData(config)
