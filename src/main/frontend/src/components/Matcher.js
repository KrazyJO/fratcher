import React from "react";
import {translate} from "react-i18next";

class Matcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render () {
    	const {t} = this.props;

    	return (
    			<div>{t('matcherComp')} m</div>
    	);
    }
}

export default translate()(Matcher);