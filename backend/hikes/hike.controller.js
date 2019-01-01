const express = require('express');
const router = express.Router();
const hikeService = require('./hike.service');

// routes with baseURL - /hikes
router.put('/register/:userid/:hikeid', register);
router.put('/unregister/:userid/:hikeid', unregister);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/*
 register,
 unregister,
 getAll,
 getById,
 create,
 update,
 delete: _delete,
 */

function register (req, res, next) {
  hikeService.register(req.params.userid, req.params.hikeid)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function unregister (req, res, next) {
  hikeService.unregister(req.params.userid, req.params.hikeid)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll (req, res, next) {
  hikeService.getAll()
    .then(hikes => res.json(hikes))
    .catch(err => next(err));
}

function getById (req, res, next) {
  hikeService.getById(req.params.id)
    .then(hike => hike ? res.json(hike) : res.sendStatus(404))
    .catch(err => next(err));
}

function create (req, res, next) {
  hikeService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function update (req, res, next) {
  hikeService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete (req, res, next) {
  hikeService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}