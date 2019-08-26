import { DataSource, DataSourceConfig } from 'apollo-datasource'
import isEmail from 'isemail'
import { Context } from 'apollo-server-core'
import { Database } from '../database'

interface IContextProps {
  user: {
    email: string
    id: string
  }
}

class UserAPI extends DataSource {
  private store: Database.IStore
  private context: Context<IContextProps> | undefined

  constructor({ store }: { store: Database.IStore }) {
    super()
    this.store = store
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<Context<IContextProps>>) {
    this.context = config.context
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg }: { email: string }) {
    const email =
            this.context && this.context.user
              ? this.context.user.email
              : emailArg
    if (!email || !isEmail.validate(email)) {
      return null
    }

    return await this.store.users.find(email)
  }

  async bookTrips({ launchIds }: { launchIds: number[] }) {
    const userId = this.context && this.context.user.id
    if (!userId) {
      return
    }

    let results = []

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId })
      if (res) {
        results.push(res)
      }
    }

    return results
  }

  async bookTrip({ launchId }: { launchId: number }) {
    const userId = this.context && this.context.user.id
    const res    = await this.store.trips.find({
      where: { userId, launchId },
    })
    return res && res.length ? res[0].get() : false
  }

  async cancelTrip({ launchId }: { launchId: number }) {
    const userId = this.context && this.context.user.id
    return !!this.store.trips.destroy({ where: { userId, launchId } })
  }

  async getLaunchIdsByUser() {
    const userId = this.context && this.context.user.id
    const found  = await this.store.trips.find({ userId })
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : []
  }

  async isBookedOnLaunch({ launchId }: { launchId: number }) {
    if (!this.context || !this.context.user) {
      return false
    }
    const userId = this.context.user.id
    const found  = await this.store.trips.find({
      userId, launchId,
    })
    return !!found
  }
}

module.exports = UserAPI
