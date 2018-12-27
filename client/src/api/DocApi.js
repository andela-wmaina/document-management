import request from 'superagent';

class DocumentApi {
  static getAllDocuments() {
    const token = localStorage.getItem('token');
    return request
      .get('/api/documents')
      .set('x-access-token', token)
      .then(response => {
        console.log(localStorage.getItem('token'), 'token')
        response.body
      })
      .catch(error => console.log(error));
  }

  static addDocument(doc) {
    const token = localStorage.getItem('token');
    return request
      .post('/api/documents')
      .set('x-access-token', token)
      .send({
        title: doc.title,
        content: doc.content,
        access: doc.access
      })
      .then(response => response.body)
      .catch(error => console.log(error));
  }

  static updateDocument(doc) {
    const token = localStorage.getItem('token');
    return request
      .put(`/api/documents/${doc.id}`)
      .set('x-access-token', token)
      .send({
        title: doc.title,
        content: doc.content,
        access: doc.access
      })
      .then(response => reponse.body)
      .catch(error => console.log(error));
  }

  static deleteDocument(id) {
    const token = localStorage.getItem('token');
    return request
      .delete(`/api/documents/${id}`)
      .set('x-access-token', token)
      .then(response => response.body)
      .catch(error => console.log(error));
  }

  static searchDocument(title) {
    const token = localStorage.getItem('token');
    return request
      .get(`/api/search/documents?title=${title}`)
      .set('x-access-token', token)
      .then(response => response.body)
      .catch(error => console.log(error));
  }
}

export default DocumentApi;
