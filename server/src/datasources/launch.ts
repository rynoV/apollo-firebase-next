import { RESTDataSource } from 'apollo-datasource-rest'

interface ILaunch {
  flight_number: any
  launch_date_unix: any
  launch_site: { site_name: any }
  mission_name: any
  links: {
    mission_patch_small: any
    mission_patch: any
  }
  rocket: {
    rocket_id: any
    rocket_name: any
    rocket_type: any
  }
}

export class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.spacexdata.com/v2/'
  }

  static launchReducer(launch: ILaunch) {
    return {
      id     : launch.flight_number || 0,
      cursor : `${launch.launch_date_unix}`,
      site   : launch.launch_site && launch.launch_site.site_name,
      mission: {
        name             : launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket : {
        id  : launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    }
  }

  async getAllLaunches() {
    const response = await this.get('launches')
    return Array.isArray(response)
      ? response.map(launch => LaunchAPI.launchReducer(launch))
      : []
  }

  async getLaunchById({ launchId }: { launchId: number }) {
    const response = await this.get('launches', { flight_number: launchId })
    return LaunchAPI.launchReducer(response[0])
  }

  getLaunchesByIds({ launchIds }: { launchIds: number[] }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    )
  }
}
