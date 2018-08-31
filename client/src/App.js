//@flow
/**
 * @file Main application
 */
import React from 'react';
import { Textbox } from 'react-inputs-validation';
import './App.css';
import FindSummoner from './components/FindSummoner/FindSummoner';

// Flow type definitions for injected props
type AppInjectedPropsType = {
}

// Flow type definitions for connected props
type AppConnectedPropsType = {
}

// Flow type definitions for bound props
type AppBoundPropsType = {
}

type AppPropsType = AppInjectedPropsType &
  AppBoundPropsType & AppConnectedPropsType;

/**
 * The state declaration for the App state
 */
type AppStateType = {
  login: boolean,
}

/**
 * Main application page
 */
class App extends React.Component<AppPropsType, AppStateType> {
  static propTypes = {};

  static defaultProps = {};

  constructor(props: AppPropsType) {
    super(props);

    this.state = {
      login: true,
    }
  }

  state: AppStateType;
  props: AppPropsType;

  /**
   * Render this React component.
   * @returns {XML}
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Summoner Stats</h1>
          <div className="search">
            <FindSummoner />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
