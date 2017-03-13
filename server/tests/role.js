//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Sequelize = require('sequelize');
let roleModel = require('../models').Role;
const { role } = require('../controllers');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('roles', () => {

  after(() => {
    roleModel.destroy({ where: { name: 'User' } })
  });

  /*
   * Test the /GET route
   */
  describe('/GET role', () => {
    it('it should GET all roles', (done) => {
      chai.request(server)
        .get('/api/roles')
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
  describe('/POST role', () => {

    it('it should POST a role', (done) => {
      let role = {
        name: "User"
      }
      chai.request(server)
        .post('/api/roles')
        .send(role)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful entry');
          done();
        });
    });
  });
});