// @flow
/**
 * @file Full summoner stats container React component, also performs all the network calls.
 * Contains all the pieces needed for a complete collection of statistics for a summoner and their
 * matches
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './SummonerStats.css';
import { LolStatServerRequests } from '../../lib/LolStatServerRequests';
import {
  NotFoundDataAccessError,
  UnauthenticatedDataAccessError,
} from "../../lib/NetworkUtilities";
import type { AugMatchDataType } from '../../data/types/MatchDataType';
import type { LeagueDataType } from '../../data/types/LeagueDataType';
import type { SummonerDataType } from '../../data/types/SummonerDataType';
import Summoner from '../Summoner/Summoner';
import Matches from '../Matches/Matches';

// Flow type definitions for injected props
type SummonerStatsInjectedPropsType = {
  match: any,
}

// Flow type definitions for connected props
type SummonerStatsConnectedPropsType = {
}

// Flow type definitions for bound props
type SummonerStatsBoundPropsType = {
}

type SummonerStatsPropsType = SummonerStatsInjectedPropsType &
  SummonerStatsBoundPropsType & SummonerStatsConnectedPropsType;

/**
 * The state declaration for the summoner stats state
 */
type SummonerStatsStateType = {
  isFetching: boolean,
  error: string,
  summonerData: SummonerDataType,
  matches: Array<AugMatchDataType>,
  leagueData: LeagueDataType,
}

const ErrorMessages = {
  NOT_FOUND_MESSAGE: 'Summoner was not found',
  UNAUTHENTICATED_MESSAGE: 'You are not authorized to retrieve summoner content',
  SERVER_FAILED: 'Riot API servers are currently offline, please try again later',
};

type ApiRequestFunctionType = (arg: any) => Promise<*>;

/**
 * Summoner Stats React Component class
 */
class SummonerStatsComponent extends
  React.PureComponent<SummonerStatsPropsType, SummonerStatsStateType> {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  constructor(props: SummonerStatsPropsType) {
    super(props);

    this.state = {
      isFetching: true,
      error: '',
      summonerData: null
    }
  }

  state: SummonerStatsStateType;
  props: SummonerStatsPropsType;

  async componentDidMount() {
    const {summoner} = this.props.match.params;
    let summonerData;
    let leagueData;
    let matches;

    await this.sendRequest(async () => {
      summonerData = await LolStatServerRequests.summoner(summoner);
    });

    if (summonerData) {
      await this.sendRequest(async () => {
        leagueData = await LolStatServerRequests.league(summonerData.id.toString());
      });

      await this.sendRequest(async () => {
        matches = await LolStatServerRequests.matches(summonerData.accountId.toString());
      });

      this.setState({
        summonerData,
        leagueData: leagueData && leagueData.length > 0 ? leagueData[0] : null,
        matches,
        isFetching: false,
      });
    }
  }

  /**
   * Higher order function to genericize request error handling for all requests made from this
   * component
   * @param requestHandler Request handling function to take inputs then send appropriate request
   * @returns {Promise<void>}
   */
  async sendRequest(requestHandler: ApiRequestFunctionType) {
    try {
      await requestHandler();
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundDataAccessError) {
        this.setState({
          error: ErrorMessages.NOT_FOUND_MESSAGE,
          isFetching: false,
        });
        return;
      }

      if (error instanceof UnauthenticatedDataAccessError) {
        this.setState({
          error: ErrorMessages.UNAUTHENTICATED_MESSAGE,
          isFetching: false,
        });
        return;
      }

      this.setState({
        error: ErrorMessages.SERVER_FAILED,
        isFetching: false,
      });
    }
  }

  /**
   * Render this React component.
   * @returns {XML}
   */
  render(): React.Node {
    if (this.state.isFetching) {
      return <div className="loader"/>
    }

    if (this.state.error) {
      return (
        <div className="error">
          {this.state.error}
        </div>
      );
    }

    // TODO make use of react-infinite-scroller to load matches as you scroll to increase responsiveness
    return (
      <div className="summonerContainer">
        <div className="summonerPane">
          <Summoner
            summonerData={this.state.summonerData}
            leagueData={this.state.leagueData}
          />
        </div>
        <div className="matchesPane">
          <Matches
            matches={this.state.matches}
          />
        </div>
      </div>
    );
  }
}

const SummonerStats = SummonerStatsComponent;
export default SummonerStats;
