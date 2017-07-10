import React from "react";
import {translate} from "react-i18next";

class LoggedOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render () {
    	const {t} = this.props;

    	return (
    			<div>
    				<span className="teaser">{t('teaser')}</span>
    				<button type="submit" className="btn btn-success btnSignUp">{t('signUp')}</button>
    			</div>
    			
    	);
    }
}

export default translate()(LoggedOut);