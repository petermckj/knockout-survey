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
			if(self.currentQuestion()===null||self.currentQuestion()===undefined)
				return -1;
			return self.questions.indexOf(self.currentQuestion());
		};
		
		self.isFinished = ko.computed(function(){
			if(self.currentQuestion()===null||self.currentQuestion()===undefined)
				return false;
			return (self.getIndex()+1 >= self.questions().length);
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
				return (item.isSelected() === false || item.isSelected() === undefined) ? false : true;
			});
		}
		
		self.nextQuestion = function(){
			var index = self.getIndex();
			var answers = self.getAnswersToQuestion(index);
			//do some validation here
			if(answers.length === 0){
				self.errorMessage("Please select an answer");
				return;
			}
			self.errorMessage(null);
			
			//should send users response to server to be stored
			//or maybe put in local storage
			//does knockout do that for us anyway?
			//$.POST(...);
			
			//find our current question in the array
			if(self.questions()[index].routing().length>0){
				var routing = self.questions()[index].routing();

				for(var i = 0; i < routing.length; i++){
					var route = routing[i];
					if(route.answerLogic()==="ALL"){
						//go to next question
						if(index+1 < self.questions().length){
							self.currentQuestion(self.questions()[index+1]);
						}
						return;
					}else if(route.answerLogic()==="OR"){
						var answersToMatch = route.ifAnswers();
						for(var j = 0; j < answersToMatch.length; j++){
							for(var k = 0; k < answers.length; k++){
								if(answers[k].answerId()===answersToMatch[j]){
									var next = self.questions().filter(function(item){
										return item.questionNumber()===route.questionNumber() ? true : false;
									});
									self.currentQuestion(next[0]);
									return;
								}
							}
						}
					}else{
						//AND
					}
				}
			}
			
			
			
		};
		
		
		/*
		*
		TODO
		Need to add routing logic based on previous answers.
		*
		*/
		
		self.previousQuestion = function(){
			
				/*
				*
				TODO
				Need to add routing to the questions going backwards as
				they now route forwards!!!
				*
				*/
			
			var index = self.getIndex();
			if(index > 0){
				self.currentQuestion(self.questions()[index-1]);
			}
		};
		
		self.finishSurvey = function(){
			
			var data = ko.mapping.toJS(self);
			console.log(data);
			$.post('/survey', data ,function(data){
				console.log('post sent, data received:' + data);
			});
			
			//this function should validate and submit responses
			//to server using AJAX / JSON
		};
		
		self.addQuestion = function(question){
			if( questionsToAdd[i].constructor === survey.Question ){
				self.questions.push(question);
				self.currentQuestion(question);
			}
		};
		
		self.addQuestions = function(questionsToAdd){
			if(Object.prototype.toString.call(questionsToAdd)!=="[object Array]" || questionsToAdd.length <= 0)
				return;
			for(var i = 0; i < questionsToAdd.length; i++){
				if( questionsToAdd[i].constructor === survey.Question )
					self.questions.push(questionsToAdd[i]);
			}
			if(self.questions().length > 0)
				self.currentQuestion(questionsToAdd[0]);
		};
	}
	survey.SurveyViewModel = SurveyViewModel;
})(window.survey);