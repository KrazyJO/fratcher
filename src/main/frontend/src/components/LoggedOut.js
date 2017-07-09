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
    			<div>{t('firstComp')}</div>
    	);
    }
}

export default translate()(LoggedOut);