//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Sequelize = require('sequelize');
let documentModel = require('../models').Document;
const { Document } = require('../controllers');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('documents', () => {

  after(() => {
    documentModel.destroy({ where: { title: 'Blue Sky' } })
  });

  /*
   * Test the /GET route
   */
  describe('/GET document', () => {
    it('it should GET all documents', (done) => {
      chai.request(server)
        .get('/api/documents')
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

    // it('it should not POST a document with an invalid email', (done) => {
    //   let document = {
    //     documentname: "Rooftop",
    //     email: 'rooftop.low',
    //     password: 'rooftop',
    //     role: 2
    //   }
    //   chai.request(server)
    //     .post('/api/documents')
    //     .send(document)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('errors');
    //       res.body.errors[0].should.have.property('message').eql('Email address must be valid');
    //       done();
    //     });
    // });

    // it('it should not POST a document with an email already registered', (done) => {
    //   let document = {
    //     documentname: "Growth",
    //     email: 'another@fel.low',
    //     password: 'growth',
    //     role: 2
    //   }
    //   chai.request(server)
    //     .post('/api/documents')
    //     .send(document)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('errors');
    //       res.body.errors[0].should.have.property('message').eql('email must be unique');
    //       done();
    //     });
    // });

    it('it should POST a document', (done) => {
      let document = {
        title: "Blue Sky",
        content: 'Why is the sky blue? Why did He create it to be blue?',
        userId: 345
      }
      chai.request(server)
        .post('/api/documents')
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
        .get('/api/documents/' + 78)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('userId');
          res.body.should.have.property('id').eql(78);
          done();
        });
    });

    it('it should not return a document', (done) => {
      chai.request(server)
        .get('/api/documents/' + 0)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Not Found');
          done();
        });
    });
  });

  describe('/PUT/:id document', () => {

    it('it should UPDATE a document given the id', (done) => {
      let document = {
        title: "Who Doc",
      }
      chai.request(server)
        .put('api/documents/' + 80)
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

  // /*
  //  * Test the /DELETE/:id route
  //  */
  // describe('/DELETE/:id document', () => {
  //   it('it should DELETE a document given the id', (done) => {
  //     chai.request(server)
  //       .delete('api/documents/' + 134)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Deleted');
  //         done();
  //       });
  //   });
  // });

});