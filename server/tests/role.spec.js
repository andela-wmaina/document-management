// Change to test environment
process.env.NODE_ENV = 'test';

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

let token;
let token2;

describe('roles', () => {
  // Before block to get token
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
      });

    const user = {
      username: 'Birdie',
      password: 'birdie'
    };

    chai.request(server)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        token2 = res.body.token;
        done();
      });
  });

  /*
   * Test the /GET route
   */
  describe('/GET role', () => {
    it('it should GET all roles', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST role', () => {
    it('it should not POST a role if not admin', (done) => {
      const role = {
        name: 'User'
      };
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', token2)
        .send(role)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You do not have the permission to create a role');
          done();
        });
    });

    it('it should POST a role', (done) => {
      const role = {
        name: 'User'
      };
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', token)
        .send(role)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You have created a role!');
          done();
        });
    });
  });
});
