//@flow
/** List of URL templates for League of Legends stat server endpoints. */
import urljoin from 'url-join';

export const Paths = {
  SUMMONER_BY_NAME: '/api/summoners',
  SUMMONER_LEAGUE: '/api/summoners/league',
  SUMMONER_MATCHES: '/api/summoners/matches',
};

export const HOST_NAME = 'lol-stat-server.herokuapp.com';
//export const HOST_NAME = 'localhost';

/**
 * Represents a protocol and its characteristics.
 */
export type WebProtocolType = {
  protocol: string,
  port: ?string,
};

/** List of web protocols used in communication */
export const WebProtocols = {
  http: {
    protocol: 'http',
    port: null, //'3000',
  },
};

/**
 * Class providing methods to generate URLs to stat server endpoints.
 */
export class LolStatServerUrls {
  /**
   * Formats a url origin from a given hostname and protocol.
   * @param hostname - The hostname
   * @param protocol - the Protocol
   * @returns {string} - The url origin based on the given hostname, protocol and port
   */
  static formatOrigin(hostname: string, protocol: WebProtocolType): string {
    let origin = `${encodeURIComponent(protocol.protocol)}://${encodeURIComponent(hostname)}`;

    if (protocol.port && protocol.port.length > 0) {
      origin = `${origin}:${encodeURIComponent(protocol.port)}`;
    }

    return origin;
  }

  /**
   * Gets the stat server origin for a given protocol and the current base domain.
   * @param protocol The protocol
   * @returns {string} The origin.
   */
  static getLolStatServerOrigin(protocol: WebProtocolType): string {
    return LolStatServerUrls.formatOrigin(HOST_NAME, protocol);
  }

  /**
   * Gets the endpoint to retrieve summoner data.
   * @param summonerName Summmoner name
   * @return {string} URL to the stat server to retrieve summoner data
   */
  static summoner(summonerName: string): string {
    return `${urljoin(LolStatServerUrls.getLolStatServerOrigin(WebProtocols.http),
      Paths.SUMMONER_BY_NAME, encodeURIComponent(summonerName))}`;
  }

  /**
   * Gets the endpoint to retrieve summoner league data.
   * @param summonerId Summoner ID
   * @return {string} URL to the stat server to retrieve summoner league data
   */
  static league(summonerId: string): string {
    return `${urljoin(LolStatServerUrls.getLolStatServerOrigin(WebProtocols.http),
      Paths.SUMMONER_LEAGUE, encodeURIComponent(summonerId))}`;
  }

  /**
   * Gets the endpoint to retrieve summoner matches data.
   * @param accountId Summoner account ID
   * @return {string} URL to the stat server to retrieve summoner matches data
   */
  static matches(accountId: string): string {
    return `${urljoin(LolStatServerUrls.getLolStatServerOrigin(WebProtocols.http),
      Paths.SUMMONER_MATCHES, encodeURIComponent(accountId))}`;
  }
}
