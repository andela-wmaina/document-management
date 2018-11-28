
class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static deactivate(){
        localStorage.removeItem('token');
    }

    static getToken() {
        localStorage.getItem('token');
    }
}

export default Auth;
