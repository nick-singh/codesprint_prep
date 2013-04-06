//This example improves on the SimpleApp and demonstrates how nodejs can be used to accumulate information from different sources
// This is helpful to overcome JavaScript client limitation of being only able to request from a single location

var express = require("express"), //Express is an external Library must use "npm install express" to access
	http 	= require("http"),
	app,
	port = 80;

app = express();
//Set-up Express Configuration
app.configure(function(){
	app.use(express.logger("dev"));	//Sets the environment logger possible values {'default','short','tiny','dev'}
	app.use(express.static(__dirname + '/public')); //Set the function to load and send to the browser HTML files contained in the public folder
});

//Simple Test to show that we can assign a function to run for an identified URL
app.get("/runtest", function(req,res){ //req - request res - response
	console.log("Test Ran"); // Display Information to the Console
	res.end("<h2>Test Ran</h2>"); //Display Information to the browser by sending information as a request
});

//Build a Simple Example that pulls world bank data and sends to client
app.get("/worldbank", function(req, res){ //http://nodejs.org/api/http.html#http_http_get_options_callback
	var url = "http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL?format=json";
	http.get(url, function(response){
		var total_data = "";
		response.on("data", function(data){
			total_data += data;
		});
		response.on("end", function(){
			//Using the response from the initial /worldbank request send information back to users
			res.end(total_data);
		});
	});
});

app.get("/devcatt", function(req, res){
	var url = "http://devca.ciudadanointeligente.org/api/rest/dataset/namdevco";
	http.get(url, function(response){
		var total_data = "";

		response.on("data", function(data){
			total_data += data;
		});

		response.on("end", function(){
			res.end(total_data);
		});
		
	});
});

//Build a simple Example that pulls developing caribbean data and sends to client

app.listen(port); //This starts a node server that will listen to request made by clients
console.log("Application Started Listening on Port %d", port);