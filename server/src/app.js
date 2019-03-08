/**
 * @file Main application
 */
import express from 'express';
import summonersController from './summonersController';
import cors from 'cors';

// express application
const app = express();
app.use(cors());
app.use('/api', summonersController);

export default app;
