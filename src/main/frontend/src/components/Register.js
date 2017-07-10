import React from "react";
import {translate} from "react-i18next";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }

    render () {
    	const {t} = this.props;

    	return (
    			<div className="component">{t('registerComp')}</div>
    	);
    }
}

export default translate()(Register);