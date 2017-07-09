import React from "react";

class LoggedOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render () {
    	return (
    			<div>This is the standard logged out component!</div>
    	);
    }
}

export default LoggedOut;