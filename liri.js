// 2. At the top of the liri.js file make it so you grab the data from keys.js and store it into a variable to use
// 3. Make it so liri.js can take in one of the following arguments
//  * my-tweets
//  * spotify-this-song
//  * movie-this
//  * do-what-it-says

var fs = require("fs"); //reads and writes files
var request = require("request");
// var keys = require('./keys.js');
// var twitter = require('twitter');
// var spotify = require ('spotify');

var liriArgument = process.argv[2];

fs.readFile("keys.js", "utf8", function(error, data) {
	var keys= data;
	console.log(keys);
});


switch(liriArgument) {
    case 'my-tweets': myTweets(); break;
    case 'spotify-this-song': spotifyThisSong(); break;
    case 'movie-this': movieThis(); break;
    case 'do-what-it-says': doWhatItSays(); break;
};


// this would output the following information to the terminal:

// Title
// Year
// IMDB Rating
// Country
// Language
// Plot
// Actors
// Rotten Tomatoes Rating
// Rotton Tomatoes UrL

// if no movie is provided then the program will output information for the movie: 'Mr. Nobody'

// if you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/
// You can catch it on Netflix

function movieThis(){
	var movie = process.argv[3];
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieObject = JSON.parse(body);
			console.log(movieObject); // Show the text in the terminal
		}
	})
};

// function movieThis() {
//   var omdbApi = 'http://www.omdbapi.com/?t=';
//   var movie = process.argv[3];
//   var omdbParameters = '&y=&plot=short&r=json&tomatoes=true';
//   var omdbUrl = omdbApi + movie + omdbParameters
//   request(omdbUrl, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var movieResults = 
//         "Title: " + JSON.parse(body)["Title"] + "\r\n" +
//         "Year: " + JSON.parse(body)["Year"] + "\r\n" +
//         "Country: " + JSON.parse(body)["Country"] + "\r\n" +
//         "Language: " + JSON.parse(body)["Language"] + "\r\n" +
//         "Rated: " + JSON.parse(body)["Rated"] + "\r\n" +
//         "Released: " + JSON.parse(body)["Released"] + "\r\n" +
//         "Genre: " + JSON.parse(body)["Genre"] + "\r\n" +
//         "Director: " + JSON.parse(body)["Director"] + "\r\n" +
//         "Writer: " + JSON.parse(body)["Writer"] + "\r\n" +
//         "Actors: " + JSON.parse(body)["Actors"] + "\r\n" +
//         "Plot: " + JSON.parse(body)["Plot"] + "\r\n" +
//         "IMDB Rating: " + JSON.parse(body)["imdbRating"] + "\r\n" +
//         "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\r\n" +
//          "Rotten Tomato URL: " + JSON.parse(body)["tomatoURL"] + "\r\n\r\n";
//       console.log(movieResults);
//     }
//   })
// }; // End movieCall()