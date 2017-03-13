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

  after(() => {
    UserModel.destroy({ where: { username: 'August' } })
  });

  /*
   * Test the /GET route
   */
  describe('/GET user', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST user', () => {

    it('it should not POST a user with an invalid email', (done) => {
      let user = {
        username: "August",
        email: 'august.low',
        password: 'august',
        role: 65
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
        role: 65
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
        role: 65
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

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      chai.request(server)
        .get('/api/users/' + 345)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          res.body.should.have.property('roleId');
          res.body.should.have.property('id').eql(345);
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {
      let user = {
        email: "fellas@fel.low",
      }
      chai.request(server)
        .put('api/users/' + 345)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful Update');
          done();
        });
    });
  });

  // /*
  //  * Test the /DELETE/:id route
  //  */
  // describe('/DELETE/:id user', () => {
  //   it('it should DELETE a user given the id', (done) => {
  //     chai.request(server)
  //       .delete('api/users/' + 134)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Deleted');
  //         done();
  //       });
  //   });
  // });

});
