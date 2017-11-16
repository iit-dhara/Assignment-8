var mongoose = require('mongoose');
var remind = 'reminders';

var remindSchema = mongoose.Schema({
	title:{
		type: String,
		require: true
	},
	description:{
		type: String,
		require:true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

remindSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('reminder', remindSchema);