// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const db = require('../_helpers/db');
const User = db.User;

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiThings);

/*
 router.post('/authenticate', authenticate);
 router.post('/register', register);
 router.get('/', authorize([Role.Admin, Role.User]), getAll);
 // router.get('/current', getCurrent);
 router.get('/:id', authorize([Role.Admin, Role.User]), getById);
 router.put('/:id', authorize(Role.User), update);
 router.delete('/:id', authorize(Role.Admin), _delete);
 */

// test users
const newAdmin = {
  'firstName': 'Alex',
  'lastName': 'Kim',
  'email': 'admin@admin.com',
  'password': 'test',
  'school': 'SEAS Undergraduate',
  'phoneNumber': '+1 (231) 231-2312',
  'interestInDriving': false,
  'interestInHiking': true,
  'medicalConditions': '',
  'roles': ['Admin', 'User'], // LOL fix so that ppl can't just POST request privileges
};
const newUser = {
  'firstName': 'Elizabeth',
  'lastName': 'Kim',
  'email': 'user@user.com',
  'password': 'test',
  'school': 'Barnard College',
  'phoneNumber': '+1 (231) 231-2312',
  'interestInDriving': false,
  'interestInHiking': true,
  'medicalConditions': '',
  'roles': ['User'],
};
let adminInDB, userInDB;

describe('Users', () => {
  before((done) => { // Before all tests we delete test admin/user
    User.deleteOne({'email': 'admin@admin.com'}, (err) => {});
    User.deleteOne({'email': 'user@user.com'}, (err) => {done();});
  });
  after((done) => { // After all tests we delete test admin/user
    User.deleteOne({'email': 'admin@admin.com'}, (err) => {});
    User.deleteOne({'email': 'user@user.com'}, (err) => {done();});
  });
  /*
   * Test register a new admin
   */
  describe('/POST register', () => {
    it('it should register a new admin', (done) => {
      chai.request(server)
        .post('/users/register')
        .send(newAdmin)
        .end((err, res) => {
          // should return {} if successful
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should register a new user', (done) => {
      chai.request(server)
        .post('/users/register')
        .send(newUser)
        .end((err, res) => {
          // should return {} if successful
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not register a new user with same email', (done) => {
      chai.request(server)
        .post('/users/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Email \"user@user.com\" is already taken');
          done();
        });
    });
    it('it should not register a new user without required fields', (done) => {
      chai.request(server)
        .post('/users/register')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql(`\
User validation failed: \
phoneNumber: User phone number is required, \
school: Path \`school\` is required., \
password: Path \`password\` is required., \
email: Path \`email\` is required., \
lastName: Path \`lastName\` is required., \
firstName: Path \`firstName\` is required.`);
          done();
        });
    });
  });
  describe('/POST authenticate', () => {
    it('it should fail authentication with wrong password', (done) => {
      chai.request(server)
        .post('/users/authenticate')
        .send({
          'email': newAdmin.email,
          'password': `wrong${newAdmin.password}`,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Email or password is incorrect');
          done();
        });
    });
    it('it should authenticate and receive an admin token', (done) => {
      chai.request(server)
        .post('/users/authenticate')
        .send({
          'email': newAdmin.email,
          'password': newAdmin.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('password');
          res.body.should.have.property('token');
          adminInDB = res.body;
          done();
        });
    });
    it('it should authenticate and receive a user token', (done) => {
      chai.request(server)
        .post('/users/authenticate')
        .send({
          'email': newUser.email,
          'password': newUser.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('password');
          res.body.should.have.property('token');
          userInDB = res.body;
          done();
        });
    });
  });
  describe('/GET all users', () => {
    it('it should not get all users without authorization', (done) => {
      chai.request(server)
        .get('/users')
        .set('Authorization', `Bearer ${userInDB.token}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Unauthorized');
          done();
        });
    });
    it('it should get all users with authorization', (done) => {
      chai.request(server)
        .get('/users')
        .set('Authorization', `Bearer ${adminInDB.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/GET by user id', () => {
    it('it should allow admin to access other user records', (done) => {
      chai.request(server)
        .get(`/users/${userInDB._id}`)
        .set('Authorization', `Bearer ${adminInDB.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should allow user to access own records', (done) => {
      chai.request(server)
        .get(`/users/${userInDB._id}`)
        .set('Authorization', `Bearer ${userInDB.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not allow another user to access other user records', (done) => {
      chai.request(server)
        .get(`/users/${adminInDB._id}`)
        .set('Authorization', `Bearer ${userInDB.token}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Unauthorized');
          done();
        });
    });
  });
  describe('/PUT update user info by id', () => {
    afterEach((done) => { // After each test, revert user update
      User.findOneAndUpdate(userInDB._id, {'lastName': 'Kim'});
      User.findOneAndUpdate(adminInDB._id, {'lastName': 'Kim'}, (err) => {done();});
    });
    it('it should allow admin to update other user records', (done) => {
      chai.request(server)
        .put(`/users/${userInDB._id}`)
        .set('Authorization', `Bearer ${adminInDB.token}`)
        .send({...newUser, 'lastName': 'Rho'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('lastName')
            .eql('Rho');
          done();
        });
    });
    it('it should allow user to update own records', (done) => {
      chai.request(server)
        .put(`/users/${userInDB._id}`)
        .set('Authorization', `Bearer ${userInDB.token}`)
        .send({...newUser, 'lastName': 'Rho'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('lastName')
            .eql('Rho');
          done();
        });
    });
    it('it should not allow another user to update other user records', (done) => {
      chai.request(server)
        .put(`/users/${adminInDB._id}`)
        .set('Authorization', `Bearer ${userInDB.token}`)
        .send({...adminInDB, 'lastName': 'Rho'})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Unauthorized');
          done();
        });
    });
  });
  describe('/DELETE delete user by id', () => {
    after((done) => { // after all, reregister deleted user
      User.create(newUser, (err) => {done();});
    });
    it('it should not allow non admin user to delete user', (done) => {
      chai.request(server)
        .delete(`/users/${adminInDB._id}`)
        .set('Authorization', `Bearer ${userInDB.token}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Unauthorized');
          done();
        });
    });
    it('it should allow admin to delete user', (done) => {
      var agent = chai.request.agent(server);
      agent
        .delete(`/users/${userInDB._id}`)
        .set('Authorization', `Bearer ${adminInDB.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          agent
            .get(`/users`)
            .set('Authorization', `Bearer ${adminInDB.token}`)
            .end((err, res) => {
              // remove tokens for deep assertion
              let {token, ...restOfUser} = userInDB;
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.should.not.include.something.that.deep.equals(
                {...restOfUser, '_id': userInDB._id, 'id': userInDB._id});
              done();
            });
        });
    });
  });
});