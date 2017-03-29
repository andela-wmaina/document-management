import request from 'superagent';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTQ5MDcwNzk0NX0.ohAN6SSKv8aKsIgMPIdh1hh9UsCx3eNNxGxeno2_XsY';

class DocumentApi {
	static getAllDocuments() {
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
				console.log(response.body)
				return response.body;
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	static updateDocument(doc) {
		console.log(doc)
		return request
			.put(`/api/documents/${doc.id}`)
			.set('x-access-token', token)
			.send({
				doc: doc
			})
			.then(function (response) {
				console.log(response.body)
				return response.body;
			})
			.catch(function (error) {
				console.log(error)
			});
	}
}

export default DocumentApi
