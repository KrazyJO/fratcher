import Events from "pubsub-js";

class Notifications {
    constructor() {
        this.reset();
    }

    set(data) {
    	this.notifications = data;
    	Events.publish("newNotifications");
    }
    
    getTotalCount() {
    	if (!this.notifications) {
    		return 0;
    	}
    	let count = 0;
    	this.notifications.forEach((notification) => {
			count += notification.count;
    	});
    	return count;
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