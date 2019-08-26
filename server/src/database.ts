import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestore } from 'firebase'

export declare namespace Database {
  export interface IBaseDoc {
    id: number
    createdAt: string
    updatedAt: string
  }

  export interface ITrip extends IBaseDoc {
    launchId: number
    userId: number
  }

  export interface IUser extends IBaseDoc {
    email: string
    token: string
  }

  export interface IFirestoreQuery {
    [key: string]: unknown
  }

  export interface IStore<R extends IBaseDoc> {
    findOrCreate(query: R): Promise<R[] | null>

    destroy(query: R): Promise<boolean>
  }

  export type collections = 'users' | 'trips'
}

export class Store<R extends Database.IBaseDoc> implements Database.IStore<R> {
  private readonly collection: firestore.CollectionReference

  constructor(collectionId: Database.collections) {
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

    this.collection = firebase.firestore().collection(collectionId)
  }

  /**
   * Finds all documents matching the query and attempts to delete them.
   * @param query Database.IFirestoreQuery
   * @return a promise resolving to a boolean
   *   indicating whether the operation was a success or not.
   */
  async destroy(query: R): Promise<boolean> {
    try {
      const { docs } = await this.getQuerySnapshot(query)

      if (docs[0]) {
        for (const doc of docs) {
          await doc.ref.delete()
        }

        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)

      return false
    }
  }

  /**
   * First searches for documents matching the query and retrieves them. If
   * none are found they are created using the query object.
   * @param query Database.IFirestoreQuery
   * @return A promise resolving to an array containing the created or found
   *   document(s), or null if an error occurred.
   */
  async findOrCreate(query: R): Promise<R[] | null> {
    try {
      const { docs } = await this.getQuerySnapshot(query)

      if (docs[0]) {
        return docs.map((doc: firestore.QueryDocumentSnapshot) => {
          return doc.data() as R
        })
      } else {
        const newDocRef      = await this.collection.add(
          this.createDocumentObject(query),
        )
        const newDocSnapshot = await newDocRef.get()
        const newDoc         = ((await newDocSnapshot.data()) as unknown) as R

        return [newDoc]
      }
    } catch (e) {
      console.log(e)

      return null
    }
  }

  private createDocumentObject(query: R): R {
    return Object.entries(query).reduce(
      (newDoc: firestore.DocumentData, queryPair: [string, unknown]) => {
        newDoc[queryPair[0]] = queryPair[1]
        return newDoc
      },
      {},
    ) as R
  }

  private getQuerySnapshot(
    query: R,
  ): Promise<firestore.QuerySnapshot> {
    const builtFirestoreQuery: firestore.Query = Object.entries(query).reduce(
      (firestoreQuery: firestore.Query, queryPair: [string, unknown]) => {
        firestoreQuery = firestoreQuery.where(queryPair[0], '==', queryPair[1])
        return firestoreQuery
      },
      this.collection,
    )

    return builtFirestoreQuery.get()
  }
}
