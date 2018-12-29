const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  school: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  interestInDriving: {type: String},
  interestInHiking: {type: String},
  medicalConditions: {type: String},
  createdDate: {type: Date, default: Date.now},
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);