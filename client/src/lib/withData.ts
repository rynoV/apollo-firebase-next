import { HttpLink, InMemoryCache } from 'apollo-boost'
import { withData } from 'next-apollo'

const link = new HttpLink({
  uri: 'http://localhost:4000/',
})

// can also be a function that accepts a `context` object (SSR only) and
// returns a config
const config = {
  link,
  cache: new InMemoryCache(),
}

export default withData(config)
