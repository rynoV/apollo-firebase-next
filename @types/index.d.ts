export interface ILaunchConnection {
  cursor: string
  hasMore: boolean
  launches: ILaunch[]
}

export interface ILaunch {
  id: string
  site?: string
  mission?: IMission
  rocket?: IRocket
  isBooked?: boolean
}

interface IRocket {
  id: string
  name?: string
  type?: string
}

interface IUser {
  id: string
  email: string
  trips: [Launch]
}

interface IMission {
  name?: string

  missionPatch?(size: PatchSize): string
}

