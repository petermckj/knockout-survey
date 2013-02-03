var http = require('http');
var sys = require('sys');
var express = require('express');
var app = express();
var port = 8080;
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
var server = app.listen(port);

app.get("/survey",function(req,res){
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(getSurveyJson()));
});

app.post("/survey", function(req, res){
	console.log(req.body);
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify({"response":"ok"}));
})

console.log('Server running at http://127.0.0.1:/' + port);

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