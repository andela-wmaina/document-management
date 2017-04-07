import request from 'superagent';

const checkToken = localStorage.getItem('token');
const token = checkToken;

class UserApi {
    static registerUser(user) {
        return request
            .post('/api/users')
            .send({
                username: user.username,
                email: user.email,
                password: user.password
            })
            .then((response) => {
                return response.body;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static loginUser(user) {
        return request
            .post('/api/users/login')
            .send({
                username: user.username,
                password: user.password
            })
            .then((response) => {
                return response.body;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static logoutUser(user) {
        return request
            .post('/api/users/logout')
            .set('x-access-token', token)
            .then((response) => {
                return response.body;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default UserApi;
