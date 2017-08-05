import axios from "axios"; 
import Cookies from "universal-cookie";
import Notifications from './Notifications';
import UserProfile from './UserProfile';
import Events from 'pubsub-js';

class User {
    constructor() {
        this.reset();
        const cookies = new Cookies();
        const auth = cookies.get('auth');
        if (auth) {
            this.setCookieCredentials(auth);
        }
    }

    //is called after refresh
    setCookieCredentials(credentials) {
    	console.log("setCookieCredentials");
        axios.defaults.headers.common['Authorization'] = `Bearer ${credentials.token}`;
        axios.get("/api/profile/" + credentials.profileId)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			this.set(credentials);
    			console.log(data);
        		UserProfile.set(data);
    		}
    		else
    		{
    			this.reset();
    		}
    		Events.publish("loggedIn"); //reset views
        });
    }
    
    fetchProfile() {
    	
    }

    //is called by loginbutton
    set(userData) {
        axios.get("/api/profile/" + userData.profileId)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			this.userName = userData.user.userName;
    	        this.id = userData.user.id;
    	        this.profileId = userData.profileId;
    	        UserProfile.set(data);
    		}
    		else
    		{
    			this.reset();
    		}
    		Events.publish("loggedIn"); //reset views
        });
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
        Notifications.reset();
        UserProfile.reset();
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