// 2. At the top of the liri.js file make it so you grab the data from keys.js and store it into a variable to use
// 3. Make it so liri.js can take in one of the following arguments
//  * my-tweets
//  * spotify-this-song
//  * movie-this
//  * do-what-it-says

	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require('./keys.js');
	var twitter = require('twitter');
	var spotify = require ('spotify');

	var liriArgument = process.argv[2];

	switch(liriArgument) {
		case 'my-tweets': myTweets(); break;
		case 'spotify-this-song': spotifyThisSong(); break;
		case 'movie-this': movieThis(); break;
		case 'do-what-it-says': doWhatItSays(); break;
	};

	function movieThis(){
		var movie = process.argv[3];
		if (!movie) {
			movie = 'mr nobody'
		};
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				//console.log(movieObject); // Show the text in the terminal
				var movieResults =
				'Title: ' + movieObject.Title+"\r\n"+
				'Year: ' + movieObject.Year+"\r\n"+
				'Imdb Rating: ' + movieObject.imdbRating+"\r\n"+
				'Country: ' + movieObject.Country+"\r\n"+
				'Language: ' + movieObject.Language+"\r\n"+
				'Plot: ' + movieObject.Plot+"\r\n"+
				'Actors: ' + movieObject.Actors+"\r\n"+
				'Rotten Tomatoes Rating: ' + movieObject.tomatoRating+"\r\n"+
				'Rotten Tomatoes URL: ' + movieObject.tomatoURL;
				console.log(movieResults)
			} else {
				console.log("Error :"+ error);
				return;
			}
		})
	};
	function myTweets() {
		var client = new twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});
		var twitterUsername = "JahdashaFlagg";
		twitterUsername = process.argv[3];
		params = {screen_name: twitterUsername};
		client.get('statuses/user_timeline/', params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	}
function spotifyThisSong(songName) {
  spotify.search({ type: 'track', query: songName }, function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    var albumInfo = data.tracks.items[0];
    var spotifyResults = 
      "Artist: " + albumInfo.artists[0].name + "\r\n" +
      "Track Name: " + albumInfo.name + "\r\n" +
      "Album: " + albumInfo.album.name + "\r\n" +
      "Preview Link: " + albumInfo.preview_url + "\r\n\r\n";
    console.log(spotifyResults);
  })
}; // End spotifyCall()