//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  /*
   * Test the /POST route
   */
  describe('/POST user', () => {
    it('it should not POST a user with an invalid email', (done) => {
      const user = {
        username: 'August',
        email: 'august.low',
        password: 'august',
        role: 2
      };
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
      const user = {
        username: 'August',
        email: 'peter@tree.com',
        password: 'august',
        role: 2
      };
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
      const user = {
        username: 'August',
        email: 'august@fel.low',
        password: 'august',
        role: 2
      };
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
      const user = {
        username: 'August',
        password: 'august'
      };
      chai.request(server)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful login');
          done();
        });
    });
  });
});
