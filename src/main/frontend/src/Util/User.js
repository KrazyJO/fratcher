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
        this.userName = data.user.userName;
        this.id = data.user.id;
        this.profileId = data.profileId;
    }
    
    setChatPartnerOnlineStatus(bValue) {
    	this.chatPartnerOnlineStatus = bValue;
    }
    
    getChatPartnerOnlineStatus() {
    	return this.chatPartnerOnlineStatus;
    }
    
    setWebSocketConnection(oWebSocketConnection) {
    	this.oWebSocketConnection = oWebSocketConnection;
    }
    
    getWebSocketConnection() {
    	return this.oWebSocketConnection;
    }
    
    getId() {
    	return this.id;
    }
    
    getUserName() {
    	return this.userName;
    }

    setChatPartnerName(sValue) {
    	this.chatPartnerName = sValue;
    }
    
    getChatPartnerName() {
    	return this.chatPartnerName;
    }
    
    reset() {
    	axios.defaults.headers.common['Authorization'] = ``;
        this.userName = undefined;
        this.id = -1;
        this.inRegistrationProcess = false;
        var oWs = this.getWebSocketConnection();
        if (oWs)
        {
        	oWs.close();
        }
    }
    
    isInRegistrationProcess () {
    	return this.inRegistrationProcess;
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