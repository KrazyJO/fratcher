import React from "react";
import ReactDOM from "react-dom";

//Internatiolalisation
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

//Routing
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Link} from "react-router-dom";

//own component
import LoggedOut from './components/LoggedOut';
import Matcher from './components/Matcher';
import Navigator from './components/Navigator';
import Register from './components/Register';

class Root extends React.Component {
    constructor(props) {
        super(props);
        // Force initialization of the object.
    }

    render() {
        return (
            <div>
	            <Navigator ref={(component) => {
	                this.nav = component;
	            }} />
                <Switch>
                    <Route path="/matcher" component={Matcher}/>

                    <Route path="/register" component={Register}/>
                    {/*Default route*/}
                    <Route path="/" component={LoggedOut}/>
                </Switch>
            </div>
        );
    }
}

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<Router>
			<Root />
		</Router>
    </I18nextProvider>
    ,
    document.getElementById('root'));

