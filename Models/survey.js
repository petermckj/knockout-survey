module.exports = function(config, mongoose){
	var crypto = require('crypto');
	
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
	});
	
	var Survey = mongoose.model('Survey',SurveySchema); 
}