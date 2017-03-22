process.env.NODE_ENV='test'

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

let token;
//Our parent block
describe('Users', () => {
  before((done) => {
    const admin = {
      username: 'Peter',
      password: 'peter'
    };
    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
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
      const user = {
        email: 'fellas@fel.low',
      };
      chai.request(server)
        .put('/api/users/2')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Your changes have been successfully applied');
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
        .delete('/api/users/4')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User has been deleted');
          done();
        });
    });
  });

  describe('/GET/?limit={integer}?offset={integer} for user', () => {
    it('it should GET users based on query', (done) => {
      chai.request(server)
        .get('/api/users/?limit=1&offset=2')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET/?username search user', () => {
    it('it should GET a user by the given username', (done) => {
      chai.request(server)
        .get('/api/search/users/?username=Fox')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body[0].should.have.property('username').eql('Fox');
          done();
        });
    });
  });
});
