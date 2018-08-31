/**
 * @file Server listening service
 */
import app from './app';

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Riot API server listening on port ${port}`);
});

export default server;
