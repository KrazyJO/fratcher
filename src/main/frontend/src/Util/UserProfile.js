
class UserProfile {
    constructor() {
        this.reset();
    }

    setCookieCredentials(credentials) {
        this.set(credentials.user);
    }

    set(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        if (this.gender === null)
        {
        	this.gender = 2;
        }
        this.yearOfBirth = data.yearOfBirth;
        this.description = data.description;
        this.hobbies = data.hobbies;
    }

    reset() {
    	this.id = -1;
    	this.firstName = "";
        this.lastName = "";
        this.gender = 2;
        this.yearOfBirth = "";
        this.description = "";
        this.hobbies = "";
    }
    
    getProfileDataObject () {
    	return {
    		id : this.id,
    		firstName : this.firstName,
    		lastName : this.lastName,
    		gender : this.gender,
    		yearOfBirth : this.yearOfBirth,
    		description : this.description,
    		hobbies : this.hobbies,
    	};
    }

    /**
     * @return true, if all necessary fields are filled
     */
    isValidForSubmit() {
        return this.id !== -1 && this.yearOfBirth && this.description && this.hobbies;
    }

    isNotInitial() {
        return !this.isValidForSubmit();
    }
}

// Singleton pattern in ES6.
export default (new UserProfile);