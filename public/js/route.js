(function (survey) {
	function Route(data){
		var self = this;
		self.questionNumber = ko.observable();
		self.ifAnswers = ko.observableArray([]);
		self.answerLogic = ko.observable();
		if(data){
			self.questionNumber(data.questionNumber);
			self.answerLogic(data.answerLogic);
			self.ifAnswers(data.ifAnswers);
		}
		return self;
	}
	survey.Route = Route;
})(window.survey);