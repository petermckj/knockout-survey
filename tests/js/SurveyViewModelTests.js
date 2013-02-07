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
test("TO BE IMPLEMENTED", function(){
	ok(true,"we expect to do this");
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
	var Question = new survey.Question().questionNumber(1);
	var Question2 = new survey.Question().questionNumber(2);
	Question.answers().push(new survey.Answer().isSelected(false));
	ViewModel.addQuestions([Question,Question2]);
	ViewModel.nextQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===1, "We expect current question number to be 1" );
	
});

test( "don't move on one question if question not answered", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question().questionNumber(1);
	var Question2 = new survey.Question().questionNumber(2);
	ViewModel.addQuestions([Question, Question2]);
	ViewModel.nextQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===1, "We expect current question number to be 1" );
	ok(ViewModel.errorMessage()==="Please select an answer","we expect error message to be complete");
});

test( "move on one question if not on last question and question answered", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question().questionNumber(1);
	var Question2 = new survey.Question().questionNumber(2);
	Question.answers().push(new survey.Answer().isSelected(true));
	ViewModel.addQuestions([Question, Question2]);
	ViewModel.nextQuestion();	
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ok(ViewModel.errorMessage()===null,"we expect error message to be null");
});

module("previousQuestion");
test( "do nothing if on first question", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question().questionNumber(1);
	var Question2 = new survey.Question().questionNumber(2);
	Question.answers().push(new survey.Answer().isSelected(false));
	ViewModel.addQuestions([Question,Question2]);
	ViewModel.previousQuestion();
  ok(ViewModel.currentQuestion().questionNumber()===1, "We expect current question number to be 1" );
	
});

test( "move back one question if not on first question", function(){
	var ViewModel = new survey.SurveyViewModel();
	var Question = new survey.Question().questionNumber(1);
	var Question2 = new survey.Question().questionNumber(2);
	Question.answers().push(new survey.Answer().isSelected(true));
	ViewModel.addQuestions([Question, Question2]);
	ViewModel.nextQuestion();	
	var c = ViewModel.currentQuestion();
  ok(c.questionNumber()===2, "We expect current question number to be 2" );
	ViewModel.previousQuestion();	
	var c = ViewModel.currentQuestion();
	ok(c.questionNumber()===1, "We expect current question number to be 1");
});