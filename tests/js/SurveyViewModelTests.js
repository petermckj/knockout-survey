function getSurveyJSON() {
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
					],
					"routing":[
						{
								"questionNumber": 2,
								"ifAnswers": [1,2,3],
								"answerLogic": "ALL"							
						}
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
					],
					"routing": [
						{
								"questionNumber": 3,
								"ifAnswers": [4,5],
								"answerLogic": "OR"							
						},
						{
								"questionNumber": 4,
								"ifAnswers": [6],
								"answerLogic": "OR"
						},
					]
				},
				{
					"questionNumber" : 3,
					"questionType" : "single",
					"questionText" : "question 3",
					"answers" : [
						{
							"answerId" : 7,
							"answerText" : "answer 1 q 3",
							"isSelected" : false
						},
						{
							"answerId" : 8,
							"answerText" : "answer 2 q 3",
							"isSelected" : false
						},
						{
							"answerId" : 9,
							"answerText" : "answer 3 q 3",
							"isSelected" : false
						},
					]	,
					"routing": [
						{
								"questionNumber": 4,
								"ifAnswers": [7,8],
								"answerLogic": "AND"
						},
						{
								"questionNumber": 5,
								"ifAnswers": [9],
								"answerLogic": "ALL"
						},
					]
				},
				{
					"questionNumber" : 4,
					"questionType" : "multiple",
					"questionText" : "question 4",
					"answers" : [
						{
							"answerId" : 10,
							"answerText" : "answer 1 q 4",
							"isSelected" : false
						},
						{
							"answerId" : 11,
							"answerText" : "answer 2 q 4",
							"isSelected" : false
						},
						{
							"answerId" : 12,
							"answerText" : "answer 3 q 4",
							"isSelected" : false
						},
					]	,
						"routing": [
								{
									"questionNumber": 5,
									"ifAnswers": [10,11,12],
									"answerLogic": "ALL"
								}
						]
				},
				{
					"questionNumber" : 5,
					"questionType" : "single",
					"questionText" : "question 5",
					"answers" : [
						{
							"answerId" : 13,
							"answerText" : "answer 1 q 5",
							"isSelected" : false
						},
						{
							"answerId" : 14,
							"answerText" : "answer 2 q 5",
							"isSelected" : false
						},
						{
							"answerId" : 15,
							"answerText" : "answer 3 q 5",
							"isSelected" : false
						},
					]	,
						"routing": [
								{
									"questionNumber": 0,
									"ifAnswers": [13,14,15],
									"answerLogic": "ALL"
								}
						]
				}
			]
	};
}


module("addQuestions");
test("can't add questions if don't pass an array", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.addQuestions();
	ok(ViewModel.questions().length===0,"we expect questions to have no entries");
	ViewModel.addQuestions('test');
	ok(ViewModel.questions().length===0,"we expect questions to have no entries");
	ViewModel.addQuestions(new survey.Question());
	ok(ViewModel.questions().length===0,"we expect questions to have no entries");
});

test("can't add questions if pass an array with wrong type of elements", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.addQuestions(['test','test2']);
	ok(ViewModel.questions().length===0,"we expect questions to have no entries");
});

test("can add questions if pass an array with type of Question & currentQuestion set to first element in array", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.addQuestions([new survey.Question()]);
	ok(ViewModel.questions().length===1,"we expect questions to have 1 entry");
	ok(ViewModel.currentQuestion() === ViewModel.questions()[0],"we expect current question to be set to 1st element in array");
});

module( "getIndex");
test( "returns -1 if no questions added to array", function() {
	var ViewModel = new survey.SurveyViewModel();
  deepEqual(ViewModel.getIndex() ,-1, "We expect value to be -1" );
});

test( "returns -1 if currentQuestion not set", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	ViewModel.questions().push(Question);
  deepEqual(ViewModel.getIndex() ,-1, "We expect value to be -1" );
});

test( "returns -1 if currentQuestion not set and questions contains null", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	ViewModel.questions().push(Question);
	ViewModel.questions().push(null);
  deepEqual(ViewModel.getIndex() ,-1, "We expect value to be -1" );
});

test( "returns correct index if currentQuestion set", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	ViewModel.questions().push(Question);
	ViewModel.currentQuestion(Question);
  deepEqual(ViewModel.getIndex() ,0, "We expect value to be 0" );
});

module("isFinished");
test( "returns true if questions is empty but currentQuestion is set", function() {
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.currentQuestion(new survey.Question());
	var result = ViewModel.isFinished();
  deepEqual(result ,true, "We expect value to be false" );
});

test( "returns false if currentQuestion is not set", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	ViewModel.questions().push(Question);
	var result = ViewModel.isFinished();
  deepEqual(result ,false, "We expect value to be false" );
});

test( "returns false if currentQuestion is set but not last question in questions", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	var Question2 = new survey.Question();
	ViewModel.questions().push(Question);
	ViewModel.questions().push(Question2);
	ViewModel.currentQuestion(Question);
	var result = ViewModel.isFinished();
  deepEqual(result ,false, "We expect value to be false" );
});

test( "returns true if currentQuestion is set and is last question in questions", function() {
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	var Question2 = new survey.Question();
	ViewModel.questions().push(Question);
	ViewModel.questions().push(Question2);
	ViewModel.currentQuestion(Question2);
	var result = ViewModel.isFinished();
  deepEqual(result ,true, "We expect value to be true" );
});

module( "questionMode" );
test("questionMode always returns question type from model", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	var bindingContext = {"$parent":ViewModel.currentQuestion()};
	var result = ViewModel.questionMode(null,bindingContext);
	deepEqual(result,ViewModel.currentQuestion().questionType(),"we expect questionMode to return " + ViewModel.currentQuestion().questionType());
});

module( "getAnswersToQuestion" );
test( "return empty array if answers isSelected === undefined", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	var Answer = new survey.Answer();
	var Answer2 = new survey.Answer();
	Question.answers().push(Answer);
	Question.answers().push(Answer2);
	ViewModel.questions().push(Question);
  deepEqual(ViewModel.getAnswersToQuestion(0).length ,0, "We expect value to be 0" );
});
test( "return empty array if no answers selected", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	var Answer = new survey.Answer().isSelected(false);
	var Answer2 = new survey.Answer().isSelected(false);
	Question.answers().push(Answer);
	Question.answers().push(Answer2);
	ViewModel.questions().push(Question);
  deepEqual(ViewModel.getAnswersToQuestion(0).length ,0, "We expect value to be 0" );
});
test( "return array if 1 answer selected", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question();
	var Answer = new survey.Answer().isSelected(false);
	var Answer2 = new survey.Answer().isSelected(true);
	Question.answers().push(Answer);
	Question.answers().push(Answer2);
	ViewModel.questions().push(Question);
  deepEqual(ViewModel.getAnswersToQuestion(0).length ,1, "We expect value to be 1" );
});

module("nextQuestion");
test( "do nothing if already on last question", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.currentQuestion(ViewModel.questions()[ViewModel.questions().length-1]);
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===5, "We expect current question number to be 5" );
});

test( "don't move on one question if question not answered", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.nextQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===1, "We expect current question number to be 1" );
	ok(ViewModel.errorMessage()==="Please select an answer","we expect error message to be complete");
});

test( "move on one question if not on last question and question answered - routing ALL", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();	
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ok(ViewModel.errorMessage()===null,"we expect error message to be null");
});

test( "move on to correct question if not on last question and question answered - routing OR", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	//now do routing test
	ViewModel.questions()[1].answers()[2].isSelected(true);
	ViewModel.nextQuestion();
	c = ViewModel.currentQuestion();
	ok(c.questionNumber()===4, "We expect current question number to be 4" );
	ok(ViewModel.errorMessage()===null,"we expect error message to be null");
});

test( "move on to correct question if not on last question and question answered - routing AND", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ViewModel.questions()[1].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	c = ViewModel.currentQuestion();
	ok(c.questionNumber()===3, "We expect current question number to be 3" );
	//
	ViewModel.questions()[2].answers()[0].isSelected(true);
	ViewModel.questions()[2].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	c = ViewModel.currentQuestion();
	deepEqual(c.questionNumber(),4, "We expect current question number to be 4" );
	ok(ViewModel.errorMessage()===null,"we expect error message to be null");
});

test( "move on to correct question if not on last question and question answered - routing AND -> inverse test", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ViewModel.questions()[1].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	c = ViewModel.currentQuestion();
	ok(c.questionNumber()===3, "We expect current question number to be 3" );
	//
	ViewModel.questions()[2].answers()[1].isSelected(true);
	ViewModel.nextQuestion();
	c = ViewModel.currentQuestion();
	deepEqual(c.questionNumber(),5, "We expect current question number to be 5" );
	ok(ViewModel.errorMessage()===null,"we expect error message to be null");
});


module("previousQuestion");
test( "do nothing if on first question", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.previousQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===1, "We expect current question number to be 1" );
});

test( "move back one question if not on first question", function(){
	var ViewModel = new survey.SurveyViewModel();
	ViewModel.loadFromJSON(getSurveyJSON());
	ViewModel.questions()[0].answers()[1].isSelected(true);
	ViewModel.nextQuestion();	
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ViewModel.previousQuestion();	
	var c = ViewModel.currentQuestion();
	ok(c.questionNumber()===1, "We expect current question number to be 1");
});