const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../_helpers/db');
const Hike = db.Hike;
const User = db.User;

module.exports = {
  register,
  unregister,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// register user for a hike
/*
 API: hikes/register/[userid]/[hikeid]/
 METHOD: PUT
 PERMISSIONS: user
 1. check for fake auth token and return user if valid, else return unauthorized
 2. find user by id
 3. find hike by id
 4. check if hike exists, else return hike DNE error
 5. add user to hike.hikers list
 6. save new hikes object
 */
async function register (userid, hikeid) {
  const hike = await Hike.findById(hikeid);
  const user = await User.findById(userid);

  // if hike is full, return error
  if (hike.isFull) {
    throw `This hike is already full`;
  }

  // add user to hike
  hike.hikers.push(user);
  // log registration
  hike.log.push({
    action: 'Register',
    userId: userid,
  });

  await hike.save();
}

// unregister user for a hike
/*
 API: hikes/unregister/[userid]/[hikeid]
 METHOD: PUT
 PERMISSIONS: user
 1. check for fake auth token and return user if valid, else return unauthorized
 2. find user by id
 3. find hike by id
 4. if user is registered for hike continue, else return user not registered
 5. remove user from hike.hikers list
 6. save new hikes object
 */
async function unregister (userid, hikeid) {
  const hike = await Hike.findById(hikeid);
  // const user = await User.findById(userid);

  // if user unregisters <24hr before hike, prohibit
  let diffDays = Math.abs(
    (new Date().getTime() - hike.dateOfHike.getTime()) / (24 * 60 * 60 * 1000));
  if (diffDays < 1) {
    // log unregistration attempt
    hike.log.push({
      action: 'Unregister Failed',
      userId: userid,
    });
    await hike.save();
    throw `Cannot unregister <24hrs before date of hike. Email "cuhiking@gmail.com" to unregister from hike.`;
  }

  // unregister user
  hike.hikers.pull({id: userid});
  // log unregistration
  hike.log.push({
    action: 'Unregister',
    userId: userid,
  });

  await hike.save();
}

// get all hikes
/*
 API: /hikes
 METHOD: GET
 PERMISSIONS: none
 1. return Promise with hikes data
 */
async function getAll () {
  return await Hike.find();
}

// get hike by id
/*
 API: /hikes/[hikeid]
 METHOD: GET
 PERMISSIONS: none
 1. find hike by id
 2. return Promise with hike data
 */
async function getById (id) {
  return await Hike.findById(id);
}

// create hike
/*
 API: /hikes/new
 METHOD: POST
 PERMISSIONS: admin
 */
async function create (hikeParams) {
  const hike = new Hike(hikeParams);

  await hike.save();
}

// update hike by id
/*
 API: /hikes/[hikeid]
 METHOD: PUT
 PERMISSIONS: admin, leaders
 1. check for fake auth token and return user if valid, else return unauthorized
 2. find hike by id
 3. get body data
 4. save new hike data
 2. return Promise with hike data
 */
async function update (id, hikeParams) {
  const hike = await Hike.findById(id);

  // validate
  if (!hike) throw 'Hike not found';

  // copy hikeParam properties to hike
  Object.assign(hike, hikeParams);

  // save hike
  await hike.save();
}

// delete hike by id
/*
 API: /hikes/[hikeid]
 METHOD: DELETE
 PERMISSIONS: admin
 1. check if hike exists, else return DNE error
 1. find hike by id
 2. delete hike element
 3. save new hike data
 */
async function _delete (id) {
  return await Hike.findByIdAndRemove(id);
}