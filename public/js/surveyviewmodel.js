(function (survey){
	function SurveyViewModel(){
		var self = this;
		self.userID = 1; //should be assigned on load somehow
		self.questions = ko.observableArray([]);
		self.currentQuestion = ko.observable(null);
		self.errorMessage = ko.observable(null);
		
		self.setUserID = function(uid){
			self.userID = uid;
		};
		
		self.getIndex = function(){
			return self.questions.indexOf(self.currentQuestion());
		};
		
		self.isFinished = ko.computed(function(){
			return (self.getIndex()+1 < self.questions().length);
		});
		
		self.questionMode =  function(question, bindingContext){
			if(bindingContext.$parent.questionType() === "multiple"){
				return "multiAnswerTemplate";
			}else{
				return "answerTemplate";
			}
		};
		
		self.getAnswersToQuestion = function(index){
			return self.questions()[index].answers().filter(function (item) {
				return item.isSelected() === false ? false : true;
			});
		}
		
		self.nextQuestion = function(){
			var index = self.getIndex();
			
			//do some validation here
			if(self.getAnswersToQuestion(index).length === 0){
				self.errorMessage("Please select an answer");
				return;
			}
			self.errorMessage(null);
			
			//should send users response to server to be stored
			//or maybe put in local storage
			//does knockout do that for us anyway?
			//$.POST(...);
			
			//find our current question in the array
			
			if(index+1 < self.questions().length){
				self.currentQuestion(self.questions()[index+1]);
			}
		};
		
		
		/*
		*
		TODO
		Need to add routing logic based on previous answers.
		*
		*/
		
		self.previousQuestion = function(){
			var index = self.getIndex();
			if(index > 0){
				self.currentQuestion(self.questions()[index-1]);
			}
		};
		
		self.finishSurvey = function(){
			/*for(var i = 0; i < self.questions().length; i++){
				var q = self.questions()[i];
				var a = self.getAnswersToQuestion(i);
				console.log(q.questionNumber() + ":");
				for(var x = 0; x < a.length;x++){
					console.log(a[x].answerText());
				}
			}*/
			
			var data = ko.mapping.toJS(self);
			console.log(data);
			$.post('/survey', data ,function(data){
				console.log('post sent, data received:' + data);
			});
			
			//this function should validate and submit responses
			//to server using AJAX / JSON
		};
		
		self.addQuestion = function(question){
			self.questions.push(question);
			self.currentQuestion(question);
		};
		
		self.addQuestions = function(questionsToAdd){
			for(var i = 0; i < questionsToAdd.length; i++){
				self.questions.push(questionsToAdd[i]);
			}
			self.currentQuestion(questionsToAdd[0]);
		};
	}
	survey.SurveyViewModel = SurveyViewModel;
})(window.survey);