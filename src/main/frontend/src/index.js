import React from "react";
import ReactDOM from "react-dom";


//Internatiolalisation
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

//Routing
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import Root from './components/Root';

ReactDOM.render(
	<CookiesProvider>
		<I18nextProvider i18n={i18n}>
			<Router history={history}>
				<Root />
			</Router>
	    </I18nextProvider>
    </CookiesProvider>
    ,
    document.getElementById('root'));

