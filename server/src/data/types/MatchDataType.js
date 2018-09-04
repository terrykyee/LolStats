//@flow
/**
 * @file Riot API match related data types
 */

export type MatchDataType = {
  platformId: string,
  gameId: number,
  champion: number,
  queue: number,
  season: number,
  timestamp: number,
  role: string,
  lane: string,
}

export type MatchesDataType = {
  matches: Array<MatchDataType>,
}

export type BansType = {
  championId: number,
  pickTurn: number,
}

export type TeamType = {
  teamId: number,
  win: string,
  firstBlood: boolean,
  firstTower: boolean,
  firstInhibitor: boolean,
  firstBaron: boolean,
  firstDragon: boolean,
  firstRiftHerald: boolean,
  towerKills: number,
  inhibitorKills: number,
  baronKills: number,
  dragonKills: number,
  vilemawKills: number,
  riftHeraldKills: number,
  dominionVictoryScore: number,
  bans: Array<BansType>,
}

export type StatsType = {
  participantId: number,
  win: boolean,
  item0: number,
  item1: number,
  item2: number,
  item3: number,
  item4: number,
  item5: number,
  item6: number,
  kills: number,
  deaths: number,
  assists: number,
  largestKillingSpree: number,
  largestMultiKill: number,
  killingSprees: number,
  longestTimeSpentLiving: number,
  doubleKills: number,
  tripleKills: number,
  quadraKills: number,
  pentaKills: number,
  unrealKills: number,
  totalDamageDealt: number,
  magicDamageDealt: number,
  physicalDamageDealt: number,
  trueDamageDealt: number,
  largestCriticalStrike: number,
  totalDamageDealtToChampions: number,
  magicDamageDealtToChampions: number,
  physicalDamageDealtToChampions: number,
  trueDamageDealtToChampions: number,
  totalHeal: number,
  totalUnitsHealed: number,
  damageSelfMitigated: number,
  damageDealtToObjectives: number,
  damageDealtToTurrets: number,
  visionScore: number,
  timeCCingOthers: number,
  totalDamageTaken: number,
  magicalDamageTaken: number,
  physicalDamageTaken: number,
  trueDamageTaken: number,
  goldEarned: number,
  goldSpent: number,
  turretKills: number,
  inhibitorKills: number,
  totalMinionsKilled: number,
  neutralMinionsKilled: number,
  neutralMinionsKilledTeamJungle: number,
  neutralMinionsKilledEnemyJungle: number,
  totalTimeCrowdControlDealt: number,
  champLevel: number,
  visionWardsBoughtInGame: number,
  sightWardsBoughtInGame: number,
  wardsPlaced: number,
  wardsKilled: number,
  firstBloodKill: boolean,
  firstBloodAssist: boolean,
  firstTowerKill: boolean,
  firstTowerAssist: boolean,
  firstInhibitorKill: boolean,
  firstInhibitorAssist: boolean,
  combatPlayerScore: number,
  objectivePlayerScore: number,
  totalPlayerScore: number,
  totalScoreRank: number,
  playerScore0: number,
  playerScore1: number,
  playerScore2: number,
  playerScore3: number,
  playerScore4: number,
  playerScore5: number,
  playerScore6: number,
  playerScore7: number,
  playerScore8: number,
  playerScore9: number,
  perk0: number,
  perk0Var1: number,
  perk0Var2: number,
  perk0Var3: number,
  perk1: number,
  perk1Var1: number,
  perk1Var2: number,
  perk1Var3: number,
  perk2: number,
  perk2Var1: number,
  perk2Var2: number,
  perk2Var3: number,
  perk3: number,
  perk3Var1: number,
  perk3Var2: number,
  perk3Var3: number,
  perk4: number,
  perk4Var1: number,
  perk4Var2: number,
  perk4Var3: number,
  perk5: number,
  perk5Var1: number,
  perk5Var2: number,
  perk5Var3: number,
  perkPrimaryStyle: number,
  perkSubStyle: 8100
}

export type AugStatsType = StatsType & {
  item0Url: string,
  item1Url: string,
  item2Url: string,
  item3Url: string,
  item4Url: string,
  item5Url: string,
  item6Url: string,
  kda: number,
  totalCreepScore: number,
  tcsPerMin: number,
}

export type DeltasType = {
  "10-20": number,
  "0-10": number,
  "30-end": number,
  "20-30": number,
}

export type TimelineType = {
  participantId: number,
  creepsPerMinDeltas: DeltasType,
  xpPerMinDeltas: DeltasType,
  goldPerMinDeltas: DeltasType,
  csDiffPerMinDeltas: DeltasType,
  xpDiffPerMinDeltas: DeltasType,
  damageTakenPerMinDeltas: DeltasType,
  damageTakenDiffPerMinDeltas: DeltasType,
  role: string,
  lane: string,
}

export type BaseParticipantType =  {
  participantId: number,
  teamId: number,
  championId: number,
  spell1Id: number,
  spell2Id: number,
  highestAchievedSeasonTier: string,
  timeline: TimelineType,
}

export type ParticipantType = BaseParticipantType & {
  stats: StatsType,
}
export type AugParticipantType = BaseParticipantType & {
  stats: AugStatsType,
  championImgUrl: string,
  championName: string,
}

export type PlayerType = {
  platformId: string,
  accountId: number,
  summonerName: string,
  summonerId: number,
  currentPlatformId: string,
  currentAccountId: number,
  matchHistoryUri: string,
  profileIcon: number,
}

export type ParticipantIdentityType =   {
  participantId: number,
  player: PlayerType,
}

export type BaseAugMatchDetailsType = BaseMatchDetailsType & {
  summonerIdentityIndex: number,
  summonerSpell1ImgUrl: string,
  summonerSpell2ImgUrl: string,
  win: boolean,
  gameDurationMin: number,
}

export type BaseMatchDetailsType = {
  gameId: number,
  platformId: string,
  gameCreation: number,
  gameDuration: number,
  queueId: number,
  mapId: number,
  seasonId: number,
  gameVersion: string,
  gameMode: string,
  gameType: string,
  teams: Array<TeamType>,
  participantIdentities: Array<ParticipantIdentityType>,
}

export type MatchDetailsType = BaseMatchDetailsType & {
  participants: Array<ParticipantType>,
}

export type AugMatchDetailsType = BaseAugMatchDetailsType & {
  participants: Array<AugParticipantType>,
}

export type AugMatchDataType = MatchDataType & {
  details: AugMatchDetailsType,
}

export type AugMatchesDataType = {
  matches: Array<AugMatchDataType>,
}
