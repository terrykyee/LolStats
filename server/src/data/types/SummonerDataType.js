//@flow
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
