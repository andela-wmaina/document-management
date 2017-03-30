// Change to test environment
process.env.NODE_ENV = 'test'

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

let token;
let token2;

describe('documents', () => {
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
  describe('/GET document', () => {
    it('it should GET all documents', (done) => {
      chai.request(server)
        .get('/api/documents')
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
  describe('/POST document', () => {
    it('it should not POST a document', (done) => {
      const document = {
        title: 'Song List',
        content: "I'm Yours - Jason Marz, The Man Who Can't Be Moved - The Script, Too Lost In You - Sugababes"
      };
      chai.request(server)
        .post('/api/documents')
        .send(document)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Opps! You need a token to access this');
          done();
        });
    });

    it('it should POST a document', (done) => {
      const document = {
        title: 'Blue Sky',
        content: 'Why is the sky blue? Why did He create it to be blue?',
      };
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', token2)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You have successfuly created a document');
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
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
          res.body.should.have.property('message').eql('We could not find this document :(');
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id document', () => {
    it('it should UPDATE a document given the id', (done) => {
      const document = {
        title: 'Wisdom',
      };
      chai.request(server)
        .put('/api/documents/2')
        .set('x-access-token', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Your changes have been successfully applied');
          done();
        });
    });

    it('it should not UPDATE a document if document is not an admin or the owner', (done) => {
      const document = {
        title: 'Songs',
      };
      chai.request(server)
        .put('/api/documents/1')
        .set('x-access-token', token2)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You do not have the permission to make any changes to this document');
          done();
        });
    });

    it('it should not UPDATE a document if document is not found', (done) => {
      const document = {
        title: 'Songs',
      };
      chai.request(server)
        .put('/api/documents/54')
        .set('x-access-token', token2)
        .send(document)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('We could not find this document :(');
          done();
        });
    });

    it('it should UPDATE a document by the given id if an admin', (done) => {
      const document = {
        title: 'Knowledge',
      };
      chai.request(server)
        .put('/api/documents/2')
        .set('x-access-token', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Your changes have been successfully applied');
          done();
        });
    });

    it('it should UPDATE a document by the given id if userId matches owners id', (done) => {
      const document = {
        title: 'Songs',
      };
      chai.request(server)
        .put('/api/documents/3')
        .set('x-access-token', token2)
        .send(document)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Your changes have been successfully applied');
          done();
        });
    });
  });

  describe('/GET/?limit={integer}?offset={integer} pagination for documents', () => {
    it('it should GET documents based on query', (done) => {
      chai.request(server)
        .get('/api/documents/?limit=1&offset=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET/?title route
   */
  describe('/GET/?title search documents', () => {
    it('it should not GET a document by the given title', (done) => {
      chai.request(server)
        .get('/api/search/documents/?title=Wisdom')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('We could not find this document :(');
          done();
        });
    });

    it('it should GET a document by the given title', (done) => {
      chai.request(server)
        .get('/api/search/documents/?title=Knowledge')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('title').eql('Knowledge');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id document', () => {
    it('it should DELETE a document given the id', (done) => {
      chai.request(server)
        .delete('/api/documents/4')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted');
          done();
        });
    });

    it('it should not DELETE a document that does not exist', (done) => {
      chai.request(server)
        .delete('/api/documents/145')
        .set('x-access-token', token2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('We could not find this document :(');
          done();
        });
    });

    it('it should not DELETE a document if it is not the owner or an admin deleting it', (done) => {
      chai.request(server)
        .delete('/api/documents/1')
        .set('x-access-token', token2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You do not have the permission to make any changes to this document');
          done();
        });
    });

    it('it should DELETE a document if an admin is deleting it', (done) => {
      chai.request(server)
        .delete('/api/documents/3')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted');
          done();
        });
    });
  });
});
