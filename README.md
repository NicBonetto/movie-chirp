# [Movie Chirp](https://movie-chirp.herokuapp.com/)

### A web app for movie buffs that want a live-stream of non-critic movie reviews.

This web app is a data-scraping tool used to get Twitter hashtag queries from user input. Just enter a search term, and get a live stream of tweets and their sentiment analysis. 

Although this was originally intended for movies, you can search for anything you would like.

__Live Demo:__ https://movie-chirp.herokuapp.com/

*Notice: There is a daily limited number of Twitter Stream API requests.*

# Preview

![Movie Chirp Demo](https://user-images.githubusercontent.com/28014739/29384416-d8cfccbe-8288-11e7-9238-4d8fcaff1df6.gif)

# Getting Started
This application uses Git and Node, so ensure they are installed. Then, follow these prompts in the terminal: 

```
$ git clone https://github.com/NicBonetto/movie-chirp.git
$ cd movie-chirp/
$ npm install
```

After all the required dependencies and devDependencies are installed, set up required environmental variables in a .env file for Twitter credentials, Express app listening port, and database url. Then run:

`$ npm run all`

Go to your browser and search localhost:PORT <- (whatever your PORT environmental variable is).

# Technologies Used:
The following list are the technologies and libraries used in Movie Chirp:
***

+ JavaScript
+ CSS3
+ HTML5
+ ES2015
+ React
+ Redux
+ Node
+ PostgreSQL
+ Socket.io
+ Heroku
+ Twitter Streaming API
