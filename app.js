var http = require('http');
var sys = require('sys');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var port = 8080;

mongoose.connect('mongodb://localhost/knockout-survey');


	app.use(express.static(__dirname + '/public'));
	app.use(express.limit('1mb'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	/*app.use(express.session({
		secret: "dewc89je9c0ewd89ehd02ubpb", store: new MemoryStore()
	}));*/


var SurveySchema = new mongoose.Schema({
	userId: {type:Number},
	dateCreated: {type: Date, default: Date.now},
	questions: [{
		questionNumber: Number,
		questionType: String,
		questionText: String,
		answers:[
			{
				answerId: Number,
				answerText: String,
				isSelected: Boolean
			}
		]
	}]
}	, 
{ collection : 'surveys' });

var Survey = mongoose.model('survey',SurveySchema);
var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

var server = app.listen(port);

app.get("/survey",function(req,res){
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(getSurveyJson()));
});

app.get("/mongo", function(req,res){
	res.writeHead(200,{
		'Content-Type': 'application/json'
	});
	var s = getJSONFromMongo(function(r){
		res.end(r);
	});
})

app.post("/survey", function(req, res){
	console.log(req.body);
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	var s = new Survey(req.body);
	s._id = null;
	s.save(function(err){
		if(err){
			console.log(err);
		}
	});
	res.end(JSON.stringify({"response":"ok"}));
})

console.log('Server running at http://127.0.0.1:/' + port);

function getJSONFromMongo(callback){
	  Survey.find(function (err, s) {
	   if(err){
			console.log("error: " + err);
	    onErr(err,callback);
	   }else{
	    //mongoose.connection.close();
	    callback(JSON.stringify(s));
	   }
	  })
}

function getSurveyJson() {
	return {
		"questions" : [
				{
					"questionNumber" : 1,
					"questionType" : "multiple",
					"questionText" : "question 1",
					"answers" : [
						{
							"answerId" : 1,
							"answerText" : "answer 1 q 1",
							"isSelected" : false
						},
						{
							"answerId" : 2,
							"answerText" : "answer 2 q 1",
							"isSelected" : false
						},
						{
							"answerId" : 3,
							"answerText" : "answer 3 q 1",
							"isSelected" : false
						},
					]
				},
				{
					"questionNumber" : 2,
					"questionType" : "single",
					"questionText" : "question 2",
					"answers" : [
						{
							"answerId" : 4,
							"answerText" : "answer 1 q 2",
							"isSelected" : false
						},
						{
							"answerId" : 5,
							"answerText" : "answer 2 q 2",
							"isSelected" : false
						},
						{
							"answerId" : 6,
							"answerText" : "answer 3 q 2",
							"isSelected" : false
						},
					]
				},
				{
					"questionNumber" : 3,
					"questionType" : "single",
					"questionText" : "question 3",
					"answers" : [
						{
							"answerId" : 1,
							"answerText" : "answer 1 q 3",
							"isSelected" : false
						},
						{
							"answerId" : 2,
							"answerText" : "answer 2 q 3",
							"isSelected" : false
						},
						{
							"answerId" : 3,
							"answerText" : "answer 3 q 3",
							"isSelected" : false
						},
					]
				}
			]
	};
}