import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SummonerStats from './components/SummonerStats/SummonerStats';

const root = (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/summoners/:summoner' component={SummonerStats} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
