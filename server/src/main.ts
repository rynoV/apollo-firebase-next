import { server } from './index'

export const apiHandler = server.createHandler({
  path: '/api/main',
})

// export async function apiHandler(req, res) {
//   try {
//     const { url } = await server.listen()
//     console.log(`🚀 Server ready at ${url}`)
// const query = `
//     mutation LoginUser {
//         login(email: "daisy@apollographql.com")
//     }
// `
// const test  = await server.executeOperation({
//   query,
// })
// console.log(test)
// const user = await new Store<Database.ITrip>('users').findOrCreate({
//   email: 'new@email.com',
// })
//
// console.log('USER', user)
// const profiles    = await firestore.doc('profiles/dDP56JYxoP2DWxl0csbF')
//   .get()
// const profileData = profiles.data()
//     res.status(200).json({ profile: { address: 'test' } })
//   } catch (e) {
//     console.log('SERVER ERROR:', e)
//     res.status(500)
//   }
// }
