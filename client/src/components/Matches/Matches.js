// @flow
/**
 * @file Matches container React component
 * Contains all matches
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './Matches.css';
import { AugMatchesDataType } from '../../data/types/MatchDataType';

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

const ErrorMessages = {
  NOT_FOUND_MESSAGE: 'Your user name has not been registered, please visit the Sign Up page if you wish to register',
  UNAUTHENTICATED_MESSAGE: 'You have entered an invalid user name or password',
  SERVER_FAILED: 'Our service is currently offline, please try again later',
};

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
        {error}
      </div>
    );
  }
}

const Matches = MatchesComponent;
export default Matches;
