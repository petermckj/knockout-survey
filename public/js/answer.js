(function (survey) {
	function Answer(data){
		var self = this;
		self.answerId = ko.observable();
		self.answerText = ko.observable();
		self.isSelected = ko.observable();
		if(data){
			self.answerId(arguments[0].answerId);
			self.answerText(arguments[0].answerText);
			self.isSelected(arguments[0].isSelected);
		}
		return self;
	}
	survey.Answer = Answer;
})(window.survey);