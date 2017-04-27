// import data from keys.js
var fs = require("fs");
var inquirer = require("inquirer")
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");

var userKeys = require("./keys.js");
var user = new twitter(userKeys.twitterKeys);



// take in commands:
// my-tweets (shows last 20 tweets in bash)


// movie-things][3s  (title, year,imdb rating, country produced, lang, plot, actors, rotten tomatoes url, mr.nobody default) dont for get the omdb request

// do-what-it-says (fs node pkg to random.txt)

// append everything to a log.txt file

// -----------------------funkshuns ---------------------
//spotify
function music(){

					inquirer.prompt([

					{
						type: "input",
						name: "song",
						message: "What song are you curious about?"
					}

									]).then(function(user) 

								{
									//request info
									spotify.search({type: "track", query: user.song, "limit": 3}, function(err, data) 
									{
										if(err) 
										{
											console.log("Error: " + err);
										}
										else{
											var info = data.body.name;

											console.log(info);

											 
											//console.log(info);
											 //console.log(JSON.stringify(data, null, 2));
											// console.log(JSON.parse(ans));

											}	
												
									})
								});

				}

//omdb
function film()
	{

		inquirer.prompt([
			{
				type: "input",
				name: "movie",
				message:"What movie are you interested in?"
			}

						]).then(function(user)

							{
								var movieChoice = user.movie.split();
								request("http://www.omdbapi.com/?t=" + movieChoice + "&r=json&tomatoes=true", function (error, response, body)
								{
									if (!error && response.statusCode === 200)
										{
											console.log("Your movie: " + JSON.parse(body).Title);
											console.log("Year: " + JSON.parse(body).Year);
											console.log("IMDB rating: " + JSON.parse(body).Country);
											console.log("Language: " + JSON.parse(body).Language);
											console.log("Summary: " + JSON.parse(body).Plot);
											console.log("Actors: " + JSON.parse(body).Actors);
											console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
										}

								});	

							});
	}

//Twitter
var time = [];
var texts = [];
var param = {screen_name: "divqween"};


function myTweets()
	{

	
		user.get('statuses/user_timeline', param, function(err, tweets ,response)
		{

			if (!err)
			{

				for(var i=0; i<20; i++)
						{	
							console.log(JSON.stringify(err, null, 2));
							time = (results.data[i].created_at).toGMTString();
							texts = results.data[i].text;


							console.log("____________________ \nTimeStamp: " + time + "\n \nTweet: " + texts +"\n \n___________________\n");
						}

			} 	else{
				console.log("Error: " + err +".  Something went wrong, try another inquiry.");
			
					}

		});
	}


//Surprise me

//function rando()
	// {

	// 	var pick = Math.floor((Math.random()*3) ++):
	// }
	

console.log("Hello, I'm Liri.");

inquirer.prompt([

	{
		type: "input",
		name: "name",
		message: "What do I call you?"
	},


	// { GET HELP ON WHAT TO DO WITH THE PASS
	// 	type: "confirm",
	// 	name: "passConfirm",
	// 	message: "Would you like to set up a password?"
	// },


	{
		type: "list",
		name: "userPrompt",
		message: "What would you like me to do for you?",
		choices: [
				"song info",
				"movie info",
				"my tweets",
				"surprise me."

				]
	}
				]).then(function(user) 
				{
					// spotify-this-song (shows artsscsist, song name, preveiw link, album song is from if no song provided , default song)

					if (user.userPrompt === "song info") 
					{
						music();

					}	

					else if (user.userPrompt === "movie info")
					{
						film();
					}

					else if (user.userPrompt === "my tweets")
					{
						myTweets();
					}

					// else if (user.userPrompt === "surprise me")
					// {
					// 	rando();
					// }

					fs.appendFile("log.txt","\n" + console.log(process.argv[3]));
				});