
class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static checkAuthentication() {
        return localStorage.getItem('token') !== null;
    }

    static deactivate(){
        localStorage.removeItem('token');
    }

    static getToken() {
        localStorage.getItem('token');
    }
}

export default Auth;
