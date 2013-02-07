(function (survey) {
	function Question(data){
		var self = this;
		self.questionNumber = ko.observable();
		self.questionType = ko.observable();
		self.questionText = ko.observable();
		self.answers = ko.observableArray([]);
		
		if(data){
			self.questionNumber(data.questionNumber);
			self.questionType(data.questionType);
			self.questionText(data.questionText);

			var mapping = {
				'answers': {
					create: function(options) {
						return new survey.Answer(options.data);
					}
				},
				'routing': {
					create: function(options) {
						return new survey.Route(options.data);
					}
				}
			};
				
			ko.mapping.fromJS(data, mapping, this);

		}
		return self;
	}
	survey.Question = Question;
})(window.survey);