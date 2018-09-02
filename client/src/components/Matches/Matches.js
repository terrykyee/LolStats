// @flow
/**
 * @file Matches container React component
 * Contains all matches
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './Matches.css';
import { AugMatchesDataType } from '../../data/types/MatchDataType';
import Match from '../Match/Match';

// Flow type definitions for injected props
type MatchesInjectedPropsType = {
  matches: AugMatchesDataType,
}

// Flow type definitions for connected props
type MatchesConnectedPropsType = {
}

// Flow type definitions for bound props
type MatchesBoundPropsType = {
}

type MatchesPropsType = MatchesInjectedPropsType &
  MatchesBoundPropsType & MatchesConnectedPropsType;

/**
 * The state declaration for the summoner stats state
 */
type MatchesStateType = {
}

/**
 * Summoner Stats React Component class
 */
class MatchesComponent extends
  React.PureComponent<MatchesPropsType, MatchesStateType> {
  static propTypes = {
    matches: PropTypes.object, // TODO create matching types to flow types and use shape here,
  };

  static defaultProps = {};

  constructor(props: MatchesPropsType) {
    super(props);

    this.state = {
    }
  }

  state: MatchesStateType;
  props: MatchesPropsType;

  async componentDidMount() {
    console.log(this.props.matches);
  }

  generateMatches() {
    if (this.props.matches && this.props.matches.matches) {
      return this.props.matches.matches.map( match => (
        <React.Fragment key={match.gameId}>
          <Match match={match} />
        </React.Fragment>
      ));
    }
  }

  /**
   * Render this React component.
   * @returns {XML}
   */
  render(): React.Node {
    const matches = this.generateMatches();
    return (
      <div className="matches">
        {matches}
      </div>
    );
  }
}

const Matches = MatchesComponent;
export default Matches;
