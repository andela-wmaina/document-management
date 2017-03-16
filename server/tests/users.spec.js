//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Sequelize = require('sequelize');
let UserModel = require('../models').User;
const { User } = require('../controllers');
const jwt = require('jsonwebtoken');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

let token;
//Our parent block
describe('Users', () => {
  

  before((done) => {
    const admin = {
      username: 'Peter',
      password: 'peter'
    }

    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        token = res.body.token
        done()
      })
  });

  /*
   * Test the /GET route
   */
  describe('/GET user', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      chai.request(server)
        .get('/api/users/2')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          res.body.should.have.property('roleId');
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id user', () => {
    it('it should UPDATE a user by the given id', (done) => {
      let user = {
        email: "fellas@fel.low",
      }
      chai.request(server)
        .put('api/users/2')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          console.log(err)
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful Update');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
      chai.request(server)
        .delete('api/users/4')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Deleted');
          done();
        });
    });
  });

  describe('/GET/ pagination for user', () => {
    it('it should return fetch number of users specified in integer \
      and skip number of users specified in offset', (done) => {
        chai.request(server)
          .get('api/user/?limit=2&offset=2')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a(object);
            res.body.should.have.property('message')/eql('Successful');
            done()
          });
      });
  });

});
