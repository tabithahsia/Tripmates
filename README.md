# Tripmates
  > An app that makes it easy for friends to plan a trip together.

## Description ##
  > Create a trip plan by specifying a destination, tentative dates, estimated costs, and a starter list of activity ideas. Invite friends to add/vote on desired trip dates and activities.

## Demo ##
https://tripmates.herokuapp.com
  
## Creators ##
  > [Nikhil Mehta](https://github.com/nikhilrmehta7)  
  > [Lydia Demissachew](https://github.com/Lyddem)  
  > [Eric Davis](https://github.com/efdavis)    
  > [An Yu](https://github.com/anyu)
  
## Customer quote ##
"It's trippy, mayne!" – JuicyJ

# Development

## Installation requirements ##
  * Node
  * NPM
  * MySQL
  * API key for YelpFusion API

## Running locally ##

Run the following commands from the root directory:
```javascript
npm install  
npm run build:watch  
npm start
```  

Initialize database (replace with MySQL username/password if different):
```javascript
mysql -u root -p < server/schema.sql
```  
  
## Current constraints / Some known bugs ##
* YelpFusion API results lag.
* Invited friend must already have a Tripmates account.
* Inviting a nonexistent user prevents trip creation even if an existent user is later invited.
* Creating a trip with the same trip name as someone else's will give you both access to the same trip.
* Adding a date range or activity that matches another exactly will tie vote counts together.
* Estimated costs must be in number format to create trip.
* Adding blank date options/activity ideas displays empty bullets.
* Lonesome lad on homepage banner misrepresents Tripmates' social YOLO ethos.
