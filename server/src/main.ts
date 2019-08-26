import firebase from 'firebase/app'
import 'firebase/firestore'
import { ApolloServer } from 'apollo-server'

import typeDefs from './schema.graphql'
import { Database, Store } from './database'
import { resolvers } from './resolvers'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey           : 'AIzaSyAuYRojN1dJeJWKwG7LEfMepB7DLH9jj3c',
    authDomain       : 'fir-learn-f283b.firebaseapp.com',
    databaseURL      : 'https://fir-learn-f283b.firebaseio.com',
    projectId        : 'fir-learn-f283b',
    storageBucket    : '',
    messagingSenderId: '685582142278',
    appId            : '1:685582142278:web:da516a0ac57a7ea2',
  }

  firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore()

export const server = new ApolloServer({
  resolvers,
  typeDefs,
  playground   : true,
  introspection: true,
})

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })

export async function apiHandler(req, res) {
  try {
    // let userId   = 3
    // let launchId = 2
    //
    // const trips = await new Store<Database.ITrip>('trips').findOrCreate({
    //   userId,
    //   launchId,
    // })

    // console.log('TRIPS', trips)
    const profiles    = await firestore.doc('profiles/dDP56JYxoP2DWxl0csbF')
      .get()
    const profileData = profiles.data()
    res.status(200).json({ profile: profileData })
  } catch (e) {
    console.log('SERVER ERROR:', e)
    res.status(500)
  }
}

