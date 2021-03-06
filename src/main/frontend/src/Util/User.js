import axios from "axios"; 
import Cookies from "universal-cookie";
import Notifications from './Notifications';
import UserProfile from './UserProfile';
import Events from 'pubsub-js';

class User {
    constructor() {
        this.setWebSocketConnection = this.setWebSocketConnection.bind(this);
    	this.reset();
        const cookies = new Cookies();
        const auth = cookies.get('auth');
        if (auth) {
            this.setCookieCredentials(auth);
        }
    }

    //is called after refresh
    setCookieCredentials(credentials) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${credentials.token}`;
        axios.get("/api/profile/" + credentials.user.id)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			this.set(credentials);
        		UserProfile.set(data);
    		}
    		else
    		{
    			this.reset();
    		}
    		Events.publish("loggedIn"); //reset views
        });
    }
    
    //is called by loginbutton
    set(userData) {
    	axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    	this.id = userData.user.id;
    	this.userName = userData.user.userName;
        axios.get("/api/profile/" + userData.user.id)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
//    	        this.profileId = userData.profileId;
    	        UserProfile.set(data);
    	        this.openWebSocket();
    		}
    		else
    		{
    			this.reset();
    		}
    		Events.publish("loggedIn"); //reset views
        });
    }
    
    openWebSocket() {
    	if (this.getWebSocketConnection())
    	{
    		return;
    	}
    	let sSocketProtocol = "ws";
    	if (window.location.protocol === "https:")
    	{
    		sSocketProtocol = "wss";
    	}
    	let sSocketHost = sSocketProtocol + "://" + window.location.host + "/api/chat";
    	var oSocket = new WebSocket(sSocketHost);
    	this.setWebSocketConnection(oSocket);
    	oSocket.onopen = function() {
    		oSocket.send('{"user":"' +this.id+ '"}');
    	}.bind(this);
    	
    	oSocket.onmessage = function(oEvent) {
    		Events.publish("socketMessage", oEvent.data)
    	}
    	
    	oSocket.onerror = function(oEvent) {
    		console.log("websocket has an error...");
    	}
    	
    	oSocket.onclose = function() {
    		this.setWebSocketConnection(undefined);
    	}.bind(this);
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
    
    setChatPartnerId(value) {
    	this.chatPartnerId = value;
    }
    
    getChatPartnerId() {
    	return this.chatPartnerId;
    }
    
    reset() {
    	axios.defaults.headers.common['Authorization'] = ``;
        this.userName = undefined;
        this.id = -1;
        var oWs = this.getWebSocketConnection();
        if (oWs)
        {
        	oWs.close();
        }
        Notifications.reset();
        UserProfile.reset();
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