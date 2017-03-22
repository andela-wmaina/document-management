//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

let token;

describe('roles', () => {
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
    it('it should POST a role', (done) => {
      let role = {
        name: "User"
      }
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
