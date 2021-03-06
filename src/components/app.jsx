import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "../serviceWorker";

// Custom css
import "../fonts/fonts.css";
import "../style/style.css";

// Auth components
import Signup from "./auth/signUp";
import SignIn from "./auth/signIn";
// Dashboard
import MyApplication from "./dashboard/myApplications";
import Home from "./home";
import Quix from "./dashboard/quiz";
import StudyMaterial from "./dashboard/studyMaterial";
// page not found
import NoMatch from "./partials/pageNotFound";

// thankyou page
import ThankYou from "./Miscellaneous/thankYou";

// miscellaneous
import UsefulLinks from "./Miscellaneous/usefulLinks";
import FaqMisc from "./Miscellaneous/faq";

// Context
import { CoreStateContext } from "../context/core";

class App extends Component {
	static contextType = CoreStateContext;
	render() {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		return (
			<Switch>
				{/* <Route exact path='/loan/personal-loan' component={PersonalLoan} />
				<Route exact path='/loan/home-loan' component={HomeLoan} />
				<Route exact path='/loan/business-loan' component={BusinessLoan} />
				<Route exact path='/loan/loan-against-property' component={LoanAgainstProperty} /> */}
				<Route exact path='/' component={Home} />
				{/* Auth */}
				{/* <Route exact path='/home' component={Signup} /> */}
				<React.Fragment>
							{/* <Route exact path='/sign-in' component={SignIn} /> */}

							{/* <Route exact path='/application/personal-information' component={PersonalLoanApp} />
							<Route exact path='/application/loan-detail' component={LoanDetail} />
							<Route exact path='/application/other-details' component={OtherDetail} />
							<Route exact path='/application/work-details' component={workDetails} />
							<Route exact path='/application/bank-details' component={bankDetails} />
							<Route exact path='/application/documents' component={documents} /> */}

							{/* Miscellaneous */}
							{/* <Route exact path='/links' component={UsefulLinks} />
							<Route exact path='/faq' component={FaqMisc} /> */}

							{/* Dashboard */}
							<Route exact path='/dashboard' component={MyApplication} />
							<Route exact path='/quiz' component={Quix} />
							<Route exact path='/studyMaterial' component={StudyMaterial} />
							{/* <Route exact path='/dashboard/loans' component={Loans} />
							<Route exact path='/dashboard/profile' component={Profile} />
							<Route exact path='/dashboard/faq' component={Faq} />
							<Route exact path='/dashboard/search' component={Search} /> */}
						</React.Fragment>

				{/* Thank you */}
				{/* <Route exact path='/complete' component={ThankYou} /> */}
				<Route component={NoMatch} />
			</Switch>
		);
	}
}

export default App;
