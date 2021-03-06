var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var Article = require("./models/Articles");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.use(express.static(process.cwd() + "./public"));

mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
	console.log("Mongoose Error: ", err);
});

db.once("open", function() {
	console.log("Mongoose connection successful");
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public.index.html");
});

app.get("/api", function(req, res) {
	Articles.find({}).sort([
		["date", "descending"]
	]).limit(5).exec(function(err, doc) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(doc);
		}
	});
});

app.post("/api", function(req, res) {
	console.log("Body: " + req.body.title);

	Article.create({
		title: req.body.title,
		date: req.body.date,
		url: req.body.url 
	}, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			res.send("Saved Search");
		}
	});
});

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});