//@flow
/**
 * @file Login server requests
 */
import { checkHttpStatusCode } from './FetchUtilities';
import { LolStatServerUrls } from './LolStatServerUrls';

const LolStatRequestsErrorMessages = {
  REQUEST_ERROR: 'Error obtaining data from the Riot API server',
  REGISTER_ERROR: 'Error registering a user',
  USER_RETRIEVAL_ERROR: 'Error retrieving user information',
};

/**
 * Implementations of all stat server requests
 */
export class LolStatServerRequests {
  static async request(url: string): Promise<*> {
    const response = await fetch(url);

    checkHttpStatusCode(response, LolStatRequestsErrorMessages.REQUEST_ERROR);
    return response.json();

    /*return fetch(url)
      .then((response: Object) => {
          checkHttpStatusCode(response, LolStatRequestsErrorMessages.REQUEST_ERROR);
          return response.json();
        });*/
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
