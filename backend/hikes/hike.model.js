const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../_helpers/db');
const UserSchema = db.UserSchema;

const hikeSchema = new Schema({
  leaders: {type: [UserSchema], required: true},
  hikers: [UserSchema],
  log: [
    {
      action: String,
      userId: ObjectId,
      dateTime: {type: Date, default: Date.now},
    }],
  destination: {type: String, required: true},
  difficulty: {
    type: String,
    validate: {
      validator: function (v) {
        return /Easy|Intermediate|Difficult/i.test(v);
      },
      message: props => `${props.value} is not a valid difficulty level`,
    },
    required: true,
  },
  dateOfHike: {type: Date, default: Date.now}, // validate +1 week in advance
  transportation: {type: String, required: true},
  currNumHikers: {type: Number},
  maxHikers: {
    type: Number,
    default: () => {
      if (/^bus$/i.test(this.transportation)) {
        return 15;
      } else if (/^van$/i.test(this.transportation)) {
        return 11;
      } else if (/^train$/i.test(this.transportation)) {
        return 10;
      } else {
        return 11;
      }
    },
  },
  description: {type: String, required: true},
  createdDate: {type: Date, default: Date.now},
});

// update current number of hikers before each validation
hikeSchema.pre('validate', function (next) {
  this.currNumHikers = this.hikers.length + this.leaders.length;
  next();
});

// virtual properties to check if hike is full
hikeSchema.virtual('isFull').get(function () {
  return this.currNumHikers >= this.maxHikers;
});

hikeSchema.set('toJSON', {virtuals: true});

module.exports.Hike = mongoose.model('Hike', hikeSchema);
module.exports.HikeSchema = hikeSchema;