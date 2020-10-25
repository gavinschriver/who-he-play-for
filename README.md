
## Hey Chuck, Who He Play For
"Because Real Heads Know"

## The Concept
I'm an NBA dork. You're an NBA dork. Let's talk trash on each other for no reason.

"Who He Play For?", titled after the illustrious TNT "Inside the NBA" segment of the same name, is an interactive way to learn about all 400-some-odd active players in the league. Each user has a lineup of 5 randomly picked players, whom they must stan (support) by posting links that contain the player's name to the "Spin Zone" (message area) to earn points. Right now you get 50 points per stan, but that might change on a whim, who knows. Remember Who's Line is It Anyway? Everything's made up and the points don't matter. Classic. 

ANYWAY, you can either earn bigtime points by stanning all of your players and then generating a new lineup, OR, take points away from other users by Talking Trash on players from their current lineups. Both of these actions are facilitated by quick links to reddit searches about that player, although any link with the player's exact first and last name will work.  **current bug - players with characters in their names that get stripped from URLs (like J.J. Reddick or Karl-Anthony Towns) can't be stanned or trash talk'd - working on it!**

## Try it out?
https://hey-chuck-who-he-play-for.herokuapp.com/ Choose a username / email / password from the list provided to login and play as that user. I personally recommend Gerald Green. That guy's a gem. 

**Currently still dealing with some classic React async issues**, so if you get a white screen of death when you first log in, just hit refresh and she should load right up for ya. If Heroku is sleeping you also might have to wait a sec for ol' sleepy server mcgee to wake up.  

## Features
This app makes use of a static copy of data from the MySportsFeed API, as well as endpoints from the official NBA website for stats. 

## Technologies Used
This application was built using the React JavaScript library, and was bootstrapped with create-react-app. Additional dependencies are React Bootstrap and Moment JS. 

The API server is powered by json-server. Deployment for the app and API is through Heroku. 

Author
Gavin Schriver
