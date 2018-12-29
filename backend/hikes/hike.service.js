// register user for a hike
/*
 API: /hike-register/[userid]/[hikeid]/
 METHOD: PUT
 PERMISSIONS: user
 1. check for fake auth token and return user if valid, else return unauthorized
 2. find user by id
 3. find hike by id
 4. check if hike exists, else return hike DNE error
 5. add user to hike.hikers list
 6. save new hikes object
 */

// unregister user for a hike
/*
 API: /hike-unregister/[userid]/[hikeid]
 METHOD: PUT
 PERMISSIONS: user
 1. check for fake auth token and return user if valid, else return unauthorized
 2. find user by id
 3. find hike by id
 4. if user is registered for hike continue, else return user not registered
 5. remove user from hike.hikers list
 6. save new hikes object
 */

// get all hikes
/*
 API: /hikes
 METHOD: GET
 PERMISSIONS: none
 1. return Promise with hikes data
 */

// get hike by id
/*
 API: /hikes/[hikeid]
 METHOD: GET
 PERMISSIONS: none
 1. find hike by id
 2. return Promise with hike data
 */

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