// @flow
/**
 * @file Summoner information container React component
 * Contains just summoner specific data, no match data
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './Summoner.css';
import type { SummonerDataType } from '../../data/types/SummonerDataType';
import type { LeagueDataType } from '../../data/types/LeagueDataType';
import { lowerCaseAllWordsExceptFirstLetters } from '../../lib/StringUtilities';
import { SummonerDisplayConstants } from '../../lib/DisplayConstants';

// Flow type definitions for injected props
type SummonerInjectedPropsType = {
  summonerData: SummonerDataType,
  leagueData: LeagueDataType,
}

// Flow type definitions for connected props
type SummonerConnectedPropsType = {
}

// Flow type definitions for bound props
type SummonerBoundPropsType = {
}

type SummonerPropsType = SummonerInjectedPropsType &
  SummonerBoundPropsType & SummonerConnectedPropsType;

/**
 * The state declaration for the summoner stats state
 */
type SummonerStateType = {
}

const ErrorMessages = {
  NOT_FOUND_MESSAGE: 'Your user name has not been registered, please visit the Sign Up page if you wish to register',
  UNAUTHENTICATED_MESSAGE: 'You have entered an invalid user name or password',
  SERVER_FAILED: 'Our service is currently offline, please try again later',
};

/**
 * Summoner Stats React Component class
 */
class SummonerComponent extends
  React.PureComponent<SummonerPropsType, SummonerStateType> {
  static propTypes = {
    summonerData: PropTypes.object, // TODO create matching types to flow types and use shape here
    leagueData: PropTypes.object,
  };

  static defaultProps = {};

  constructor(props: SummonerPropsType) {
    super(props);

    this.state = {
    }
  }

  state: SummonerStateType;
  props: SummonerPropsType;

  componentDidMount() {
    console.log(this.props.summonerData);
    console.log(this.props.leagueData);
  }

  /**
   * Render this React component.
   * @returns {XML}
   */
  render(): React.Node {
    if (this.props.summonerData && this.props.leagueData) {
      return (
        <div className="summoner">
          <center><img src={this.props.summonerData.profileIconUrl} alt='Profile Icon'
              className='profileIcon'/></center>
          <div className="summonerName">{this.props.summonerData.name}</div>
          <div className="levelText">{SummonerDisplayConstants.LEVEL_LABEL} {this.props.summonerData.summonerLevel}</div>
          <div className="leagueText">
            {lowerCaseAllWordsExceptFirstLetters(this.props.leagueData.tier)} {this.props.leagueData.rank}
           </div>
          <div className="leagueTextContd">
            {this.props.leagueData.leaguePoints} {SummonerDisplayConstants.POINTS_LABEL}
          </div>
        </div>
      );
    }

    return <div />;
  }
}

const Summoner = SummonerComponent;
export default Summoner;
