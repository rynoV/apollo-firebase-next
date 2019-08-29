import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import Launches from './launches'
import withData from '../lib/withData'
import { useQuery } from '@apollo/react-hooks'
import Login from './login'
import gql from 'graphql-tag'

interface IProps {
  profile: {
    address: string
    name: string
    avatar: string
    email: string
    id: string
  }
}

const Home: NextComponentType<NextPageContext, any, IProps> = function() {
  return <Launches />
}

const IS_LOGGED_IN = gql`  query IsUserLoggedIn {    isLoggedIn @client  }`

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn ? <Home /> : <Login />
}

export const HomePage = withData(IsLoggedIn)
