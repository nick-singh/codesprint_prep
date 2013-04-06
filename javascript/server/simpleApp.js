//This application demonstrates the ability to generate a typical html server with nodejs
//It utilizes express which is a library that makes development in node easier

var express = require("express"), //Express is an external Library must use "npm install express" to access
	app,
	port = 8080;

app = express();
//Set-up Express Configuration
app.configure(function(){
	app.use(express.logger("dev"));	//Sets the environment logger possible values {'default','short','tiny','dev'}
	app.use(express.static(__dirname + '/public')); //Set the function to load and send to the browser HTML files contained in the public folder
});

app.listen(port); //This starts a node server that will listen to request made by clients
console.log("Application Started Listening on Port %d", port);