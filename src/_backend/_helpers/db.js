const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

// schemas and models
const userSM = require('../users/user.model');
const hikeSM = require('../hikes/hike.model');

module.exports = {
  User: userSM.User,
  UserSchema: userSM.UserSchema,
  Hike: hikeSM.Hike,
  HikeSchema: hikeSM.HikeSchema,
};