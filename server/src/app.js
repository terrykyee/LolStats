/**
 * @file Main application
 */
import express from 'express';
import summonersController from './summonersController';

// express application
const app = express();
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
app.use('/api', summonersController);

export default app;
