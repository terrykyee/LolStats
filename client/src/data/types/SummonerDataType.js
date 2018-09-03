//@flow
/**
 * @file Riot API summoner related data types
 */

export type AugSummonerDataType = SummonerDataType & {
  profileIconUrl: string,
}

export type SummonerDataType = {
  id: number,
  accountId: number,
  name: string,
  profileIconId: number,
  revisionDate: number,
  summonerLevel: number
}
