// @flow
export type LeagueDataType =   {
  leagueId: string,
  leagueName: string,
  tier: string,
  queueType: string,
  rank: string,
  playerOrTeamId: number,
  playerOrTeamName: string,
  leaguePoints: number,
  wins: number,
  losses: number,
  veteran: boolean,
  inactive: boolean,
  freshBlood: boolean,
  hotStreak: boolean,
}
