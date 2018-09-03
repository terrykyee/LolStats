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
import { SummonerDisplayConstants, MAX_MATCHES_TO_RETURN } from '../../lib/DisplayConstants';

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
    if (this.props.summonerData) {
      return (
        <div className="summoner">
          <center><img src={this.props.summonerData.profileIconUrl} alt='Profile Icon'
                       className='profileIcon'/></center>
          <div className="summonerName">{this.props.summonerData.name}</div>
          <div
            className="levelText">{SummonerDisplayConstants.LEVEL_LABEL} {this.props.summonerData.summonerLevel}</div>
          {this.props.leagueData ? (
            <React.Fragment>
              <div className="leagueText">
                {this.props.leagueData.tier} {this.props.leagueData.rank}
              </div>
              <div className="leagueTextContd">
                {this.props.leagueData.leaguePoints} {SummonerDisplayConstants.POINTS_LABEL}
              </div>
              <div className="leagueName">
                {this.props.leagueData.leagueName}
              </div>
              <div className="infoText">
                {`Displaying last ${MAX_MATCHES_TO_RETURN} match results`}
              </div>
            </React.Fragment>
          ) : null}
        </div>
      );
    }

    return <div/>;
  }
}

const Summoner = SummonerComponent;
export default Summoner;
