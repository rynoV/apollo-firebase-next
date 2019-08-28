import App, { Container } from 'next/app'
import withApollo from '../client/src/lib/withApollo'
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)