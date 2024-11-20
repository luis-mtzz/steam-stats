# Services Docs:

## Util Services:
- `sv.httpClient.js`: To make requests
- `sv.logExceptions.js`: Logging

## Steam Services:

- `getSteamIDFromVanity()`: Grab Steam ID from Vanity Username
  * Requires:
    - API Token: `String`
    - vanityurl: `String`
  * Returns:
    - SteamID: `String`

- `getPlayerSummaries()`: Get player summary from Steam ID
  * Requires:
    - API Token: `String`
    - steamid: `String`
  * Returns:
    - SteamID: `String`
    - PersonaName: `String`
    - ProfileURL: `String`
    - AvatarFull: `String`
    - TimeCreated: `Int`

- `getUserOwnedGames()`: Get User's Owned Games from Steam ID
  * Requires:
    - API Token: `String`
    - steamid: `String`
  * Returns:
    - appid: `String`
    - playtime: `String`

- `getUserRecentlyPlayedGames()`: Get User's recently played games from Steam ID
  * Requires:
    - API Token: `String`
    - steamid: `String`
  * Returns:
    - appid: `String`
    - name: `String`
    - playtime: `String`
