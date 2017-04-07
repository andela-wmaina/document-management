import request from 'superagent';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTQ5MTU1NTYyMn0.nkUjjYAcC24Sdtgo_5ei8pUR1FOy_yVn3BOGXq6JAnY';

class DocumentApi {
  static getAllDocuments() {
    console.log("getting here");
    return request
      .get('/api/documents')
      .set('x-access-token', token)
      .then((response) => {
        return response.body;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static addDocument(doc) {
    return request
      .post('/api/documents')
      .set('x-access-token', token)
      .send({
        title: doc.title,
        content: doc.content,
        access: doc.access
      })
      .then(function (response) {
        return response.body;
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  static updateDocument(doc) {
    return request
      .put(`/api/documents/${doc.id}`)
      .set('x-access-token', token)
      .send({
        title: doc.title,
        content: doc.content,
        access: doc.access
      })
      .then(function (response) {
        return response.body;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default DocumentApi;
