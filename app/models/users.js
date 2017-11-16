var mongoose = require('mongoose');
var user = 'users';

var userSchema = mongoose.Schema({
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	}
});

// Sets the createdAt parameter equal to the current time
userSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('user', userSchema);