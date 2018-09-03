/**
 * @file Riot API using Redis cache and API cace related utility functions
 */
import { Kayn, REGIONS, RedisCache } from 'kayn';

const redisCache = new RedisCache({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  keyPrefix: 'riotApi',
});

const apiCache = Kayn(process.env.RIOT_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  locale: 'en_US',
  debugOptions: {
    isEnabled: true,
    showKey: false,
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false,
  },
    cacheOptions: {
    cache: redisCache,
    timeToLives: {
      useDefault: true,
    },
  },
});

export async function getChampionsCache() {
  const { n: { champion: championVersion } } = await apiCache.DDragon.Realm.list();
  // Only optional locale is supported at the moment.
  const championList = await apiCache.DDragon.Champion.list().version(championVersion);

  return championList;
}

export async function getSpellsCache() {
  const { n: { summoner: summonerVersion } } = await apiCache.DDragon.Realm.list();
  const spellsList = await apiCache.DDragon.SummonerSpell.list().version(summonerVersion);

  return spellsList;
}

export default apiCache;
