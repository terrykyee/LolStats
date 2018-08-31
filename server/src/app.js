/**
 * @file Main application
 */
import express from 'express';
import summonersController from './summonersController';

// express application
const app = express();

app.use('/api', summonersController);

export default app;
