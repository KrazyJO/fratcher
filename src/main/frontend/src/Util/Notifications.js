import Events from "pubsub-js";
import axios from 'axios';
import User from './User';

class Notifications {
    constructor() {
        this.reset();
        this.onNewSocketMessage = this.onNewSocketMessage.bind(this);
        Events.subscribe("socketMessage", this.onNewSocketMessage);
    }

    set(data) {
    	this.notifications = data;
    	Events.publish("newNotifications");
    }
    
    getTotalCount() {
    	if (!this.notifications) {
    		if (User.isAuthenticated())
    		{
    			axios.get("/api/chat/notification")
    			.then(({data, status}) => {
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
    
    setMessagesRead(userId) {
    	if (this.notifications) {
    		let bUpdateServer = false;
    		this.notifications.forEach((notification) => {
    			if (notification.userId == userId) {
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
        		axios.post("/api/chat/messagesRead/"+userId);
        	}
    	}
    	
    }
    
    getNotifcationCountForUser(userId) {
    	if (!this.notifications) {
    		return 0;
    	}
    	let count;
    	this.notifications.forEach((notification) => {
    		if (notification.userId === userId)
    		{
    			count = notification.count;
    			return false; //break
    		}
    	});
    	return count;
    }
    
    increaseCount(data) {
    	let bFound = false;
    	
    	this.notifications.forEach((notification) => {
    		if (notification.userId === data.userIdFrom)
    		{
    			notification.count = notification.count + 1;
    			bFound = true;
    			return false; //break
    		}
    	});
    	
    	if (!bFound)
    	{
    		this.notifications.push({
    			count : 1,
    			userId : data.userIdFrom
    		});
    		
    	}
    	Events.publish("newNotifications");
    }
    
    onNewSocketMessage (sName, sMessage) {
    	if (!sMessage)
    	{
    		return;
    	}
    	let oMessage = JSON.parse(sMessage);
    	if (oMessage && oMessage.message)
    	{
    		//yes, it is a chatmessage
    		this.increaseCount(oMessage);
    	}
    }
    
    reset() {
    	this.notifications = undefined;
    }
    
}

// Singleton pattern in ES6.
export default (new Notifications);