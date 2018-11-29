import request from 'superagent';

const checkToken = localStorage.getItem('token');
const token = checkToken;

class DocumentApi {
  static getAllDocuments() {
    console.log('here api')
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

  static deleteDocument(id) {
    return request
      .delete(`/api/documents/${id}`)
      .set('x-access-token', token)
      .then(function (response) {
        return response.body;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static searchDocument(title) {
    return request
      .get(`/api/search/documents?title=${title}`)
      .set('x-access-token', token)
      .then(function (response) {
        console.log(response.body);
        return response.body;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default DocumentApi;
