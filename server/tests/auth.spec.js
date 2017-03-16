//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Sequelize = require('sequelize');
let UserModel = require('../models').User;
const { User } = require('../controllers');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {

  /*
   * Test the /POST route
   */
  describe('/POST user', () => {

    it('it should not POST a user with an invalid email', (done) => {
      let user = {
        username: "August",
        email: 'august.low',
        password: 'august',
        role: 2
      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('message').eql('Email address must be valid');
          done();
        });
    });

    it('it should not POST a user with an email already registered', (done) => {
      let user = {
        username: "August",
        email: 'peter@tree.com',
        password: 'august',
        role: 2
      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('message').eql('email must be unique');
          done();
        });
    });

    it('it should POST a user', (done) => {
      let user = {
        username: "August",
        email: 'august@fel.low',
        password: 'august',
        role: 2
      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful registration');
          done();
        });
    });

    it('it should log in a user', (done) => {
      let user = {
        username: 'August',
        password: 'august'
      }
      chai.request(server)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful login');
          res.body.shoul
          done();
        });
    });


  });
});