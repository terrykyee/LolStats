// @flow
/**
 * @file Login/Sign Up React component
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './SummonerStats.css';
import { LolStatServerRequests } from '../../lib/LolStatServerRequests';
import {
  NotFoundDataAccessError,
  UnauthenticatedDataAccessError,
} from "../../lib/NetworkUtilities";

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
  summonerData: any,
}

const ErrorMessages = {
  NOT_FOUND_MESSAGE: 'Your user name has not been registered, please visit the Sign Up page if you wish to register',
  UNAUTHENTICATED_MESSAGE: 'You have entered an invalid user name or password',
  SERVER_FAILED: 'Our service is currently offline, please try again later',
};

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
    const { summoner } = this.props.match.params;
    console.log(summoner);

    try {
      const summonerData = await LolStatServerRequests.summoner(summoner);

      this.setState({
        summonerData,
        isFetching: false,
      });

    } catch (error) {
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
      return <div className="loader" />
    }

    const error = this.state.error ? (
      <div className="error">
        {this.state.error}
      </div>
    ) : (<div></div>);

    return (
      <div>
        <img src={this.state.summonerData.profileIconUrl} alt='Profile Icon' className='profile-icon' />
        {this.state.summonerData.name}
        {error}
      </div>
    );
  }
}

const SummonerStats = SummonerStatsComponent;
export default SummonerStats;
