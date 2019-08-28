import React from 'react'
import fetch from 'isomorphic-unfetch'
import { NextComponentType, NextPageContext } from 'next'
import withData from '../lib/withData'
import Launches from './launches'

interface IProps {
  profile: {
    address: string
    name: string
    avatar: string
    email: string
    id: string
  }
}

const Home: NextComponentType<NextPageContext, any, IProps> = function({
  profile,
  ...rest
}) {
  if (profile) {
    return (
      <Launches />
    )
  } else {
    return null
  }
}

Home.getInitialProps = async function({ req }: NextPageContext) {
  try {
    const url =
            req &&
            req.headers &&
            req.headers.host &&
            'http://' + req.headers.host + '/api/main'

    if (!url) {
      return {}
    }

    const res = await fetch(url)

    return await res.json()
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const HomePage = withData(Home)