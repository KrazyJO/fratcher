import axios from "axios";
//import Cookies from "universal-cookie";

class User {
    constructor() {
        this.reset();
//        const cookies = new Cookies();
//        const auth = cookies.get('auth');
//        if (auth) {
//            this.setCookieCredentials(auth);
//        }
    }

    setCookieCredentials(credentials) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${credentials.token}`;
        this.set(credentials.user);
    }

    set(data) {
        this.userName = data.userName;
        this.id = data.id;
    }

    reset() {
    	axios.defaults.headers.common['Authorization'] = ``;
        this.userName = undefined;
        this.id = -1;
    }

    isAuthenticated() {
        return this.userName && this.id != -1;
    }

    isNotAuthenticated() {
        return !this.isAuthenticated();
    }
}

// Singleton pattern in ES6.
export default (new User);