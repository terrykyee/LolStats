// @flow
/**
 * @file Augment API data with more useful fields
 */
import format from 'string-format';
import {
  DATA_DRAGON_CHAMPION_IMG_URL, DATA_DRAGON_ITEM_ICON_URL,
  DATA_DRAGON_PROFILE_ICON_URL, DATA_DRAGON_SPELLS_ICON_URL,
} from './constants/urlConstants';
import { getChampionsCache, getSpellsCache } from './api-cache';
import { MATCH_WIN, MATCH_LOSS, MAX_ITEM_NUMBER } from './constants/generalConstants';
import type { SummonerDataType, AugSummonerDataType } from '../data/types/SummonerDataType';
import type {
  AugMatchDataType,
  AugParticipantType,
  MatchDataType,
  ParticipantType,
} from '../data/types/MatchDataType';

/**
 * Determine if the team specified by summonerTeamId won or lost the match
 * @param firstTeam First team provided in match details
 * @param summonerTeamId Summoner team ID
 * @returns {boolean} True if summoner's team won, otherwise false
 */
function isWin(firstTeam, summonerTeamId: number): boolean {
  if (firstTeam.teamId === summonerTeamId) {
    return firstTeam.win === MATCH_WIN;
  }
  return firstTeam.win === MATCH_LOSS;
}

/**
 * Retrieve the proper champion champion name given a champion ID
 * @param championId Champion ID
 * @returns Champion name
 */
async function getChampionName(championId: number): Promise<string> {
  const championList = await getChampionsCache();
  const id = championId.toString();
  const championKey =
    Object.keys(championList.data).filter(championKey => championList.data[championKey].key === id);

  return championList.data[championKey[0]].id;
}

/**
 * Retrieve spell name given a spell ID
 * @param spellId Spell ID
 * @returns Name of the spell corresponding to the ID
 */
async function getSpellName(spellId: number): Promise<string> {
  const spellsList = await getSpellsCache();
  const id = spellId.toString();
  const spellKey =
    Object.keys(spellsList.data).filter(spellKey => spellsList.data[spellKey].key === id);

  return spellsList.data[spellKey[0]].id;
}

/**
 * Augment summoner data with additional useful info
 * @param summonerData Summoner data
 */
export function summoner(summonerData: SummonerDataType): AugSummonerDataType {
  const result = Object.assign({}, summonerData);
  result.profileIconUrl = format(DATA_DRAGON_PROFILE_ICON_URL, summonerData.profileIconId);

  return result;
}

/**
 * Augment match details with additional useful information
 * @param accountId Summoner account ID
 * @param matchDetailsData Stock match detail data from the API
 * @returns Match detail data structure with additional fields (win, KDA, total creep score,
 * spell image URL's, item image URL's, total creep score per min, game duration in minutes)
 */
export async function matchDetails(accountId: number, matchDetailsData: MatchDataType): Promise<AugMatchDataType> {
  // TODO Cache the results of this consolidation of data to improve responsiveness
  // Determine the participant index corresponding to summoner's account ID
  const summonerIdentityIndex = matchDetailsData.participantIdentities.map(
    identity => identity.player.accountId).indexOf(accountId);
  const summonerParticipant = matchDetailsData.participants[summonerIdentityIndex];

  // Populate champion image URL's for all participants
  const augMatchParticipants =
    await Promise.all(matchDetailsData.participants.map(
      async (participant: ParticipantType): Promise<AugParticipantType> => {
        const newParticipant = Object.assign({}, participant);
        newParticipant.championName = await getChampionName(participant.championId);
        newParticipant.championImgUrl =
          format(DATA_DRAGON_CHAMPION_IMG_URL, newParticipant.championName);
        return newParticipant;
      },
    ));

  // Populate spell and item image URL's
  const summonerSpell1Name = await getSpellName(summonerParticipant.spell1Id);
  const summonerSpell2Name = await getSpellName(summonerParticipant.spell2Id);
  const summonerSpell1ImgUrl = format(DATA_DRAGON_SPELLS_ICON_URL, summonerSpell1Name);
  const summonerSpell2ImgUrl = format(DATA_DRAGON_SPELLS_ICON_URL, summonerSpell2Name);
  for (let i = 0; i < MAX_ITEM_NUMBER; i++) {
    summonerParticipant.stats[`item${i}Url`] =
      format(DATA_DRAGON_ITEM_ICON_URL, summonerParticipant.stats[`item${i}`]);
  }

  // Populate additional useful information
  const win = isWin(matchDetailsData.teams[0], summonerParticipant.teamId);
  const kda = (summonerParticipant.stats.kills + summonerParticipant.stats.assists) /
    summonerParticipant.stats.deaths;
  const totalCreepScore =
    summonerParticipant.stats.totalMinionsKilled + summonerParticipant.stats.neutralMinionsKilled;
  const gameDurationMin = matchDetailsData.gameDuration / 60;
  const tcsPerMin = totalCreepScore / gameDurationMin; // match duration is in seconds

  summonerParticipant.stats.kda = kda;
  summonerParticipant.stats.totalCreepScore = totalCreepScore;
  summonerParticipant.stats.tcsPerMin = tcsPerMin;

  // $FlowSuppress: Flow gets confused here but the resulting object is correct
  const augMatchData = Object.assign(matchDetailsData, {
    summonerIdentityIndex,
    summonerSpell1ImgUrl,
    summonerSpell2ImgUrl,
    win,
    gameDurationMin,
  });
  augMatchData.participants = augMatchParticipants;

  return augMatchData;
}
