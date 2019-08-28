import React from 'react'
import fetch from 'isomorphic-unfetch'
import { NextComponentType, NextPageContext } from 'next'

interface IProps {
  profile: {
    address: string
    name: string
    avatar: string
    email: string
    id: string
  }
}

export const Home: NextComponentType<NextPageContext, any, IProps> = function({
  profile,
}) {
  if (profile) {
    return (
      <ul>
        <li>{profile.address}</li>
        <li>{profile.name}</li>
        <li>{profile.avatar}</li>
        <li>{profile.email}</li>
        <li>{profile.id}</li>
      </ul>
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
