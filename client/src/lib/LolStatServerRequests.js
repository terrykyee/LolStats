//@flow
/**
 * @file Login server requests
 */
import { checkHttpStatusCode } from './FetchUtilities';
import { LolStatServerUrls } from './LolStatServerUrls';

const LolStatRequestsErrorMessages = {
  REQUEST_ERROR: 'Error obtaining data from the Riot API server',
};

/**
 * Implementations of all stat server requests
 */
export class LolStatServerRequests {
  static async request(url: string): Promise<*> {
    const response = await fetch(url);

    checkHttpStatusCode(response, response.status, LolStatRequestsErrorMessages.REQUEST_ERROR);
    const responseJson = await response.json();
    checkHttpStatusCode(response, responseJson.statusCode, LolStatRequestsErrorMessages.REQUEST_ERROR);
    return responseJson;
  }

  static summoner(summonerName: string): Promise<*> {
    const url = LolStatServerUrls.summoner(summonerName);
    return LolStatServerRequests.request(url);
  }

  static league(summonerId: string): Promise<*> {
    const url = LolStatServerUrls.league(summonerId);
    return LolStatServerRequests.request(url);
  }

  static matches(accountId: string): Promise<*> {
    const url = LolStatServerUrls.matches(accountId);
    return LolStatServerRequests.request(url);
  }
}
