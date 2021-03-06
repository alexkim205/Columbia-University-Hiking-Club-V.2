const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate ({email, password}) {
  const user = await User.findOne({email});

  if (user && bcrypt.compareSync(password, user.password)) {
    // return user with token without password
    const {password, ...userWithoutPwd} = user.toObject();
    const token = jwt.sign({sub: user.id, roles: user.roles}, config.secret);
    return {
      ...userWithoutPwd,
      token,
    };
  }
}

async function getAll () {
  return await User.find().select('-password');
}

async function getById (id) {
  return await User.findById(id).select('-password');
}

async function create (userParam) {
  // validate
  if (await User.findOne({email: userParam.email})) {
    throw `Email "${userParam.email}" is already taken`;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();

  return user;
}

async function update (id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.email !== userParam.email && await User.findOne({email: userParam.email})) {
    throw `Email "${userParam.email}" is already taken`;
  }

  // hash password if it was entered {
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  // save user
  await user.save();

  return user;
}

async function _delete (id) {
  await User.findByIdAndRemove(id);
}