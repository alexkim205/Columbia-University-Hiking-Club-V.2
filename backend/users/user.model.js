const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  school: {type: String, required: true},
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\+\d \(\d{3}\) \d{3}\-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`,
    },
    required: [true, 'User phone number is required']
  },
  interestInDriving: {type: String},
  interestInHiking: {type: String},
  medicalConditions: {type: String},
  createdDate: {type: Date, default: Date.now},
  groups: {
    type: [String],
    default: ['User']
  },
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);