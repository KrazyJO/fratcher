import Events from "pubsub-js";
import axios from 'axios';
import User from './User';

class Notifications {
    constructor() {
        this.reset();
    }

    set(data) {
    	this.notifications = data;
    	Events.publish("newNotifications");
    }
    
    getTotalCount() {
    	console.log("getTotalCOunt");
    	if (!this.notifications) {
    		console.log("no notifications");
    		if (User.isAuthenticated())
    		{
    			let userId = User.getId();
    			axios.get("/api/chat/notification/"+userId)
    			.then(({data, status}) => {
    				console.log("get new notifications");
    				this.set(data);
    	        });
    		}
    		return 0;
    	}
    	let count = 0;
    	this.notifications.forEach((notification) => {
			count += notification.count;
    	});
    	return count;
    }
    
    setMessagesRead(userName, sUserId) {
    	if (this.notifications) {
    		let bUpdateServer = false;
    		this.notifications.forEach((notification) => {
    			if (notification.userName === userName) {
    				if (notification.count != 0)
    				{
    					bUpdateServer = true;
    					notification.count = 0;
    				}
    				
    				return false; //break
    			}
        	});
    		
    		Events.publish("newNotifications");
        	
        	if (bUpdateServer) {
        		axios.post("/api/chat/messagesRead/"+sUserId);
        	}
    	}
    	
    }
    
    getNotifcationCountForUser(userName) {
    	if (!this.notifications) {
    		return 0;
    	}
    	let count;
    	this.notifications.forEach((notification) => {
    		if (notification.userName === userName)
    		{
    			count = notification.count;
    			return false; //break
    		}
    	});
    	return count;
    }
    
    reset() {
    	this.notifications = undefined;
    }
    
}

// Singleton pattern in ES6.
export default (new Notifications);