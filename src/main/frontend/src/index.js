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

//class Root extends React.Component {
//    constructor(props) {
//        super(props);
//        // Force initialization of the object.
//    }
//
//    render() {
//        return (
//            <div>
//				<hr/>
//                <Switch>
//                    <Route path="/matcher" component={Matcher}/>
//
//                    {/*Default route*/}
//                    <Route path="/" component={LoggedOut}/>
//                </Switch>
//            </div>
//        );
//    }
//}

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<Router>
			<div>
				<nav>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/matcher">Matcher</Link></li>
				</nav>
				<Switch>
		            <Route path="/matcher" component={Matcher}/>
		            <Route path="/" component={LoggedOut}/>
		        </Switch>
	        </div>
		</Router>
    </I18nextProvider>
    ,
    document.getElementById('root'));

