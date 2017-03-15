//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Sequelize = require('sequelize');
let documentModel = require('../models').Document;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

let token;
//Our parent block
describe('documents', () => {

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
  describe('/GET document', () => {
    it('it should GET all documents', (done) => {
      chai.request(server)
        .get('/api/documents')
        .set('x-access-token', token)
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
  describe('/POST document', () => {
    it('it should POST a document', (done) => {
      let document = {
        title: "Blue Sky",
        content: 'Why is the sky blue? Why did He create it to be blue?',
        userId: 2
      }
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful entry');
          done();
        });
    });
  });

  describe('/GET/:id document', () => {
    it('it should GET a document by the given id', (done) => {
      chai.request(server)
        .get('/api/documents/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('userId');
          done();
        });
    });

    it('it should not return a document', (done) => {
      chai.request(server)
        .get('/api/documents/0')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Not Found');
          done();
        });
    });
  });

  describe('/PUT/:id document', (done) => {

    it('it should UPDATE a document given the id', () => {
      let document = {
        title: "Who Doc",
      }
      chai.request(server)
        .put('api/documents/2')
        .set('x-access-token', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successful Update');
          res.body.should.have.property('document').title.eql(document.title);
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id document', (done) => {
    it('it should DELETE a document given the id', () => {
      chai.request(server)
        .delete('api/documents/3')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Deleted');
          done();
        });
    });
  });

  describe('/GET/ pagination for documents', () => {
    it('it should return fetch number of documents specified in integer \
      and skip number of documents specified in offset', (done) => {
        chai.request(server)
          .get('api/documents/?limit=2&offset=2')
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