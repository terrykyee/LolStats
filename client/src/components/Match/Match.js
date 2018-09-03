// @flow
/**
 * @file Match container React component
 * Displays all details of a single match
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './Match.css';
import { AugMatchDataType } from '../../data/types/MatchDataType';
import { MatchDisplayConstants, DECIMALS_TO_SHOW, MAX_ITEMS, MAX_SPELLS } from '../../lib/DisplayConstants';

// Flow type definitions for injected props
type MatchInjectedPropsType = {
  match: AugMatchDataType,
}

// Flow type definitions for connected props
type MatchConnectedPropsType = {
}

// Flow type definitions for bound props
type MatchBoundPropsType = {
}

type MatchPropsType = MatchInjectedPropsType &
  MatchBoundPropsType & MatchConnectedPropsType;

/**
 * The state declaration for the summoner stats state
 */
type MatchStateType = {
}

/**
 * Summoner Stats React Component class
 */
class MatchComponent extends
  React.PureComponent<MatchPropsType, MatchStateType> {
  static propTypes = {
    match: PropTypes.object, // TODO create matching types to flow types and use shape here,
  };

  static defaultProps = {};

  constructor(props: MatchPropsType) {
    super(props);

    this.state = {
    }
  }

  state: MatchStateType;
  props: MatchPropsType;

  /**
   * Generate JSX representing summoner spells used in a match.  An array of spell images.
   * @returns {Array} Array of React JSX representing summoner spells
   */
  generateSpells(): Array<React.Node> {
    const spellsArray = [];

    for (let i = 0; i < MAX_SPELLS; i++) {
      const link = this.props.match.details[`summonerSpell${i+1}ImgUrl`];
      spellsArray.push(
        <React.Fragment key={link}>
          <img
            src={this.props.match.details[`summonerSpell${i+1}ImgUrl`]}
            alt={`Spell ${i + 1} Icon`}
            className='spellIcon'
          />
        </React.Fragment>
      );
    }

    return spellsArray;
  }

  /**
   * Generate JSX representing summoner items used in a match. An array of item images.
   * @returns {Array} Array of React JSX representing summoner items
   */
  generateItems(): Array<React.Node> {
    const itemsArray = [];
    const summonerParticipant = this.props.match.details.participants[
      this.props.match.details.summonerIdentityIndex];

    for (let i = 0; i < MAX_ITEMS; i++) {
      itemsArray.push(
        <React.Fragment key={i}>
          <img
            src={summonerParticipant.stats[`item${i}Url`]}
            alt={`Item ${i} Icon`}
            className='itemIcon'
            onError={(e) => {e.target.hidden=true}}
          />
        </React.Fragment>
      );
    }

    return itemsArray;
  }

  /**
   * Generate JSX representing participants in the match.  An array of divs containing champion
   * image and summoner names.
   * @returns {Array} Array of React JSX representing match participants
   */
  generateParticipants(): Array<React.Node> {
    const participantsArray = [];
    const participants = this.props.match.details.participants;
    const pId = this.props.match.details.participantIdentities;
    const summonerParticipantIndex = this.props.match.details.summonerIdentityIndex;

    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      participantsArray.push(
        <React.Fragment key={participant.participantId}>
          <div className="participant">
            <img
              src={participant.championImgUrl}
              alt={`Participant ${i} Icon`}
              className='participantIcon'
              onError={(e) => {e.target.hidden=true}}
            />
            <div className={i === summonerParticipantIndex ? "" : "participantName"}>
              {pId[i].player.summonerName}
            </div>
          </div>
        </React.Fragment>
      );
    }

    return participantsArray;
  }

  /**
   * Render this React component.
   * @returns {XML}
   */
  render(): React.Node {
    const summonerParticipant = this.props.match.details.participants[
      this.props.match.details.summonerIdentityIndex];
    const summonerStats = summonerParticipant.stats;

    let matchClassname;
    let matchHeaderClassname;
    let result;

    if (this.props.match.details.win) {
      matchClassname = 'matchWin';
      matchHeaderClassname = 'matchHeaderWin';
      result = MatchDisplayConstants.WIN;
    } else {
      matchClassname = 'matchLoss';
      matchHeaderClassname = 'matchHeaderLoss';
      result = MatchDisplayConstants.LOSS;
    }

    return (
      <div className="match">
        <div className={matchHeaderClassname}>
          <div className="result">{result}</div>
          <div className="duration">{Number(this.props.match.details.gameDurationMin).toFixed(0)} min</div>
        </div>
        <div className={matchClassname}>
          <div className="champion">
            <img
              src={summonerParticipant.championImgUrl}
              alt='Champion Icon'
              className='championIcon'
            />
            <div className="championName">{summonerParticipant.championName}</div>
          </div>
          <div className="spells">
            {this.generateSpells()}
          </div>
          <div className="killStats">
            <div className='killStatItems'>{summonerStats.kills} / {summonerStats.deaths} / {summonerStats.assists}</div>
            <div className="statItems">{Number(summonerStats.kda).toFixed(DECIMALS_TO_SHOW)} {MatchDisplayConstants.KDA}</div>
          </div>
          <div className="stats">
            <div className="statItems">{MatchDisplayConstants.LEVEL} {summonerStats.champLevel}</div>
            <div className="statItems">{summonerStats.totalCreepScore} {MatchDisplayConstants.TOTAL_CREEP_SCORE}</div>
            <div className="statItems">{Number(summonerStats.tcsPerMin).toFixed(DECIMALS_TO_SHOW)} {MatchDisplayConstants.TCS_PER_MIN}</div>
          </div>
          <div className="items">
            {this.generateItems()}
          </div>
          <div className="participants">
            {this.generateParticipants()}
          </div>
        </div>
      </div>
    );
  }
}

const Match = MatchComponent;
export default Match;
