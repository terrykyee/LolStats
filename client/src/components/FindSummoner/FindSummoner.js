// @flow
/**
 * @file Find Summoner React component
 * Component that allows the user to search for summoner related statistical information
 */
import * as React from 'react';
import './FindSummoner.css';
import { Textbox } from 'react-inputs-validation';
import { FindSummonerDisplayStringConstants } from '../../lib/DisplayConstants';

// Flow type definitions for injected props
type FindSummonerInjectedPropsType = {
}

// Flow type definitions for connected props
type FindSummonerConnectedPropsType = {
}

// Flow type definitions for bound props
type FindSummonerBoundPropsType = {
}

type FindSummonerPropsType = FindSummonerInjectedPropsType &
  FindSummonerBoundPropsType & FindSummonerConnectedPropsType;

/**
 * The state declaration for the find summoner component state
 */
type FindSummonerStateType = {
  summonerName: string,
  validate: boolean,
}


/**
 * Find Summoner React Component class
 */
class FindSummonerComponent extends
  React.PureComponent<FindSummonerPropsType, FindSummonerStateType> {
  static propTypes = {
  };

  static defaultProps = {};

  constructor(props: FindSummonerPropsType) {
    super(props);

    this.state = {
      summonerName: '',
      validate: false,
    }
  }

  state: FindSummonerStateType;
  props: FindSummonerPropsType;

  /**
   * Find summoner button clicked event handler.
   * @param event {SyntheticMouseEvent} Mouse click event.
   */
  findSummonerHandler = (event: SyntheticMouseEvent<*>) => {
    window.location = `/summoners/${this.state.summonerName}`;
  };

  /**
   * Validate user entered data
   * @param props React properties
   * @param state React state
   * @returns {boolean} True if all fields are valid, otherwise false
   */
  userDataValid = (props: FindSummonerPropsType, state: FindSummonerStateType): boolean => {
    // TODO implement validation that matches up with Riot restrictions on summoner names
    return !!state.summonerName;
  };

  /**
   * Render this React component.
   * @returns {XML}
   */
  render(): React.Node {
    const summonerNameField = (
      <div className="inputField">
        <div className="label">{FindSummonerDisplayStringConstants.SUMMONER_LABEL}</div>
        <div className="input">
          <Textbox
            tabIndex="1"
            id={'summonerName'}
            name={FindSummonerDisplayStringConstants.SUMMONER_LABEL}
            type="text"
            value={this.state.summonerName}
            validate={this.state.validate}
            validationCallback={res => this.setState({ validate: false })}
            placeholder={FindSummonerDisplayStringConstants.SUMMONER_HINT}
            onChange={text => this.setState({summonerName: text})}
            onBlur={() => {}}
            validationOption={{
              name: FindSummonerDisplayStringConstants.SUMMONER_LABEL,
              check: true,
              required: false
            }}
          />
        </div>
      </div>
    );

    const contents = (
      <div className="main">
        {summonerNameField}
        <div className="findButtonPane">
          <button
            className="findButton"
            onClick={this.findSummonerHandler}
            disabled={!this.userDataValid(this.props, this.state)}
          >
            {FindSummonerDisplayStringConstants.LOAD_STATS}
          </button>
        </div>
      </div>
    );
    return (
      <div>
        {contents}
      </div>
    );
  }
}

const FindSummoner = FindSummonerComponent;
export default FindSummoner;
