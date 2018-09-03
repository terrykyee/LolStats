//@flow
/**
 * @file Summoner controller - defines all routes for the for providing summoner related information
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiCache from './lib/api-cache';
import * as dataAugmentor from './lib/dataAugmentor';
import { MAX_MATCHES_TO_RETURN } from './lib/constants/generalConstants';

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(cors());
router.use((request, response, next) => {
  response.header('Content-Type', 'application/json');
  next();
});

router.get('/summoners/:name', async (request, response) => {
  const {name} = request.params;

  try {
    const data = await apiCache.Summoner.by.name(name);
    const augData = dataAugmentor.summoner(data);
    console.log(augData);
    response.send(augData);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
});

router.get('/summoners/league/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const data = await apiCache.LeaguePositions.by.summonerID(id);
    console.log(data);
    response.send(data);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
});

router.get('/summoners/matches/:accountId', async (request, response) => {
  const { accountId } = request.params;

  try {
    // TODO make use of react-infinite-scroller to load matches as you scroll to increase responsiveness
    const matchList = await apiCache.Matchlist.by.accountID(accountId).query({
      endIndex: MAX_MATCHES_TO_RETURN,
    });

    await Promise.all(matchList.matches.map(async (match) => {
      const details = await apiCache.Match.get(match.gameId);
      match.details = await dataAugmentor.matchDetails(parseInt(accountId), details);
    }));

    response.send(matchList);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
});

export default router;
