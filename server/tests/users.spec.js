// Change to test environment
process.env.NODE_ENV='test'

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

let token;
let token2;

describe('Users', () => {
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
     it('it should not UPDATE a user if user is not an admin or the actual user', (done) => {
      const user = {
        email: 'fellas@fel.low',
      };
      chai.request(server)
        .put('/api/users/3')
        .set('x-access-token', token2)
        .send(user)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You do not have the permission to make any changes to this user');
          done();
        });
    });

    it('it should not UPDATE a user if user is not found', (done) => {
      const user = {
        email: 'fellas@fel.low',
      };
      chai.request(server)
        .put('/api/users/19')
        .set('x-access-token', token2)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('We could not find this user :(');
          done();
        });
    });

    it('it should UPDATE a user by the given id if an admin', (done) => {
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

    it('it should UPDATE a user by the given id if id matches current userId', (done) => {
      const user = {
        email: 'fox@felo.com',
      };
      chai.request(server)
        .put('/api/users/2')
        .set('x-access-token', token2)
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
   * Test the /GET/?limit={integer}?offset={integer} route
   */
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

  /*
   * Test the /GET/?username route
   */
  describe('/GET/?username search user', () => {
    it('it should GET a user by the given username', (done) => {
      chai.request(server)
        .get('/api/search/users/?username=August')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('username').eql('August');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id user', () => {
    it('it should not DELETE a user that does not exist', (done) => {
      chai.request(server)
        .delete('/api/users/4')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('We could not find this user :(');
          done();
        });
    });

    it('it should not DELETE a user if id does not much current userId or user is not an admin', (done) => {
      chai.request(server)
        .delete('/api/users/3')
        .set('x-access-token', token2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You do not have the permission to make any changes to this user');
          done();
        });
    });

    it('it should DELETE a user given the id if user is an admin', (done) => {
      chai.request(server)
        .delete('/api/users/3')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully deleted');
          done();
        });
    });
  });

});
