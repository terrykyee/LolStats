# LolStats

League of Legends Statistics Web App

A barebones summoner statistical display showing basic summoner information and match information. This project consists of a React based frontend client and a NodeJs backend proxy sever acting as a cache for the Riot League of Legends API. 

## Running the Server
```bash
# Start the server (default port 3000)
cd server
npm run start
```
### Environment Variables
The `server` uses [dotenv](https://github.com/motdotla/dotenv) for loading environment variables. The following environment variables are supported:

| Name | Description | Default |
|------|-------------|---------|
| RIOT_API_KEY | API key used for authenticating to the Riot League of Legends API | N/ A |
| REDIS_HOST | The host for the Redis instance used for caching by the server | localhost |
| REDIS_PORT | The port on which Redis listens | 6379 |
| REDIS_PASSWORD | (optional) The password required for the Redis instance | N/A |
| PORT | Port on which the Express server will listen | 3000 |

## Running the Client
```bash
# Start the server (default port 3001)
cd client
npm run start
```
### Configuration
String constants/objects in LolStatServerUrls.js define the server location the client is pointed at:

| Name | Description | Default |
|------|-------------|---------|
| HOST_NAME | Host name for the Riot API proxy server | lol-stat-server.herokuapp.com |
| protocol | The web protocol used to talk to the server | http |
| port | The port on which the server listens | 3000 |





