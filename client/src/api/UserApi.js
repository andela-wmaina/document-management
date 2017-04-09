import request from 'superagent';

const checkToken = localStorage.getItem('token');
const token = checkToken;

class UserApi {
      static fetchUser(id) {
        return request
            .get(`/api/users/${id}`)
            .set('x-access-token', token)
            .then((response) => {
                return response.body;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static updateUser(user, id) {
        return request
            .put(`/api/users/${id}`)
            .set('x-access-token', token)
            .send(user)
            .then((response) => {
                console.log(response.body);
                return response.body;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default UserApi;
