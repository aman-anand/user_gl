import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";

// API
import { loanDetail } from "../../services/loan";
import { fetchUserDetails } from "../../services/userData";
// images
import Car from "../../images/sakal-car.svg";
import Home from "../../images/home-loan.svg";
import Check from "../../images/check-big.svg";
import BankAllocated from "../../images/bank-allocated.svg";
import AxisBank from "../../images/Axis-Bank.png";
class MyApplications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanList: [],
			userData:''
		};
	}

	componentDidMount() {
		this.getLoanDetail();
		this.fetchUserData();
	}

	getLoanDetail = () => {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		let datastring = {
			access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null
		};
		loanDetail(datastring)
			.then(res => res.data)
			.then(data =>
				{
				
				this.setState({
					loanList: data.loanList,
				
				})
			}
			)
			.catch(err => alert(err.message));
	};
	// Get user data to prefill the data
	fetchUserData = () => {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		let datastring = {
			access_token: userData.access_token
		};
		fetchUserDetails(datastring)
			.then(res => res.data)
			.then(data =>
				this.setState({
					userData: data.borrowerDetail,
				})
			)
			.catch(err => alert(err.message));
	};
	render() {
		const { loanList ,userData} = this.state;
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-2 pl-0'>
						<Navigation nav={1} />
					</div>
					<div className='col-xl-10 my-application'>
						<header>
							<h1>
								Welcome back, {userData.firstName}! <span>{moment().format("DD MMMM YYYY")}</span>
							</h1>
							<p>Here’s your loan applications, their status and more details for the smoothest sanctions ever.</p>
						</header>
						{/* <div className='status-section'>
							<div className='status-text'>Incomplete</div>
							<div className='status-card'>
								<article>
									<div className='img'>
										<div className='bg-underlay'> </div>
										<img src={Car} className='loan-subject-img img-fluid' alt='card-loan-illustarion' />
									</div>
									<div className='right-detail'>
										<div className='detail-row'>
											<div className='details'>
												<h2>Car loan</h2>
												<h3>Application ID: 234-123-489</h3>
											</div>
											<div className='cta'>
												<button className='discard secondary'>discard</button>
												<button className='resume primary'>Resume</button>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div> */}
						{loanList.map((value, key) => {
							return (
								<React.Fragment>
									<div className='status-section'>
										<div className='status-text'>{value.loanApplicationStatus}</div>
										<div className='status-card'>
											<article>
												<div className='img'>
													<div className='bg-underlay'> </div>
													<img src={Home} className='loan-subject-img img-fluid' alt='card-loan-illust' />
												</div>
												<div className='right-detail'>
													<div className='detail-row'>
														<div className='details'>
															<h2>{value.purpose}</h2>
															<h3>Application ID: {value.loanId}</h3>
														</div>
														<div className='cta'>
															<button className='discard secondary' type='button' data-toggle='collapse' data-target={`#${value.loanId}`}>
																view details
															</button>
														</div>
													</div>
													<div className='detail-row status-tabs'>
														<div className='tab-items completed'>
															<div className='status-check'>
																<img src={Check} className='img-fluid' alt='status icon' />
															</div>
															<div className='status-name'>Processing</div>
															<div className='applied-list'>
																<img src={Home} alt='status icon' />
															</div>
														</div>
														<div className='tab-items in-process'>
															<div className='status-check'>
																<img src={BankAllocated} className='img-fluid' alt='status icon' />
															</div>
															<div className='status-name'>Bank Allocated</div>
															<div className='applied-list'>
																<img src={Home} alt='status icon' />
																<img src={Home} alt='status icon' />
															</div>
														</div>
														<div className='tab-items'>
															<div className='status-check'>
																<img src={Check} className='img-fluid' alt='status icon' />
															</div>
															<div className='status-name'>Approval</div>
															<div className='applied-list'>
																<img src={Home} alt='status icon' />
															</div>
														</div>
														<div className='tab-items'>
															<div className='status-check'>
																<img src={Check} className='img-fluid' alt='status icon' />
															</div>
															<div className='status-name'>Disbursed</div>
															<div className='applied-list'>
																<img src={Home} alt='status icon' />
															</div>
														</div>
													</div>
												</div>
											</article>
										</div>
									</div>
									<div className='application-preview collapse' id={value.loanId}>
										<div className='preview-card'>
											<h3>Application preview</h3>
											<ul className='nav nav-tabs nav-justified' role='tablist'>
												<li className='nav-item'>
													<a className='nav-link active' data-toggle='tab' href='#personal-information-preview' role='tab' aria-selected='true'>
														Personal Information
													</a>
												</li>
												<li className='nav-item'>
													<a className='nav-link' data-toggle='tab' href='#loan-details-preview' role='tab' aria-selected='false'>
														Loan Details
													</a>
												</li>
												<li className='nav-item'>
													<a className='nav-link' data-toggle='tab' href='#work-details-preview' role='tab' aria-selected='false'>
														Work Details
													</a>
												</li>
												<li className='nav-item'>
													<a className='nav-link' data-toggle='tab' href='#bank-details-preview' role='tab' aria-selected='false'>
														Bank Details
													</a>
												</li>
												<li className='nav-item'>
													<a className='nav-link' data-toggle='tab' href='#other-details-preview' role='tab' aria-selected='false'>
														Other Details
													</a>
												</li>
											</ul>
											<div className='tab-content'>
												<div className='tab-pane fade show active' id='personal-information-preview' role='tabpanel'>
													<div className='container-fluid'>
														<div className='row'>
															<div className='col-md-4'>
																<label>Name</label>
																<p>Aakash Sharma</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
														</div>
														<hr className='custom-hr' />
														<h5 className='sub-heading'>Personal Address</h5>
														<div className='row'>
															<div className='col-md-4'>
																<label>Name</label>
																<p>Aakash Sharma</p>
															</div>
														</div>
													</div>
												</div>
												<div className='tab-pane fade' id='loan-details-preview' role='tabpanel'>
													<div className='container-fluid'>
														<div className='row'>
															<div className='col-md-4'>
																<label>Name</label>
																<p>Aakash Sharma</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
															<div className='col-md-4'>
																<label>sadad</label>
																<p>asdad</p>
															</div>
														</div>
														<h5 className='sub-heading'>Personal Address</h5>
														<hr className='custom-hr' />
														<div className='row'>
															<div className='col-md-6'>
																<div className='media'>
																	<img src={AxisBank} className=' mr-4' alt='bank logo' />
																	<div className='media-body align-self-center'>
																		<h3>Axis Bank</h3>
																		<h4>Interest Rate: 14.58%</h4>

																		<p>Processing fee: 1.2%</p>
																	</div>
																</div>
															</div>
															<div className='col-md-6'>
																<div className='media'>
																	<img src={AxisBank} className=' mr-4' alt='bank logo' />
																	<div className='media-body align-self-center'>
																		<h3>Axis Bank</h3>
																		<h4>Interest Rate: 14.58%</h4>

																		<p>Processing fee: 1.2%</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className='tab-pane fade' id='work-details-preview' role='tabpanel'>
													...
												</div>
												<div className='tab-pane fade' id='bank-details-preview' role='tabpanel'>
													...
												</div>
												<div className='tab-pane fade' id='other-details-preview' role='tabpanel'>
													...
												</div>
											</div>
										</div>
									</div>
								</React.Fragment>
							);
						})}

						{/* <div className='status-section'>
							<div className='status-text'>Incomplete</div>
							<div className='status-card'>
								<article>
									<div className='img'>
										<div className='bg-underlay'> </div>
										<img src={Home} className='loan-subject-img img-fluid' alt='card-loan-illust' />
									</div>
									<div className='right-detail'>
										<div className='detail-row'>
											<div className='details'>
												<h2>Car loan</h2>
												<h3>Application ID: 234-123-489</h3>
											</div>
											<div className='cta'>
												<button className='discard secondary' type='button' data-toggle='collapse' data-target='#collapseExample'>
													view details
												</button>
											</div>
										</div>
										<div className='detail-row status-tabs'>
											<div className='tab-items completed'>
												<div className='status-check'>
													<img src={Check} className='img-fluid' alt='status icon' />
												</div>
												<div className='status-name'>Processing</div>
												<div className='applied-list'>
													<img src={Home} alt='status icon' />
												</div>
											</div>
											<div className='tab-items in-process'>
												<div className='status-check'>
													<img src={BankAllocated} className='img-fluid' alt='status icon' />
												</div>
												<div className='status-name'>Bank Allocated</div>
												<div className='applied-list'>
													<img src={Home} alt='status icon' />
													<img src={Home} alt='status icon' />
												</div>
											</div>
											<div className='tab-items'>
												<div className='status-check'>
													<img src={Check} className='img-fluid' alt='status icon' />
												</div>
												<div className='status-name'>Approval</div>
												<div className='applied-list'>
													<img src={Home} alt='status icon' />
												</div>
											</div>
											<div className='tab-items'>
												<div className='status-check'>
													<img src={Check} className='img-fluid' alt='status icon' />
												</div>
												<div className='status-name'>Disbursed</div>
												<div className='applied-list'>
													<img src={Home} alt='status icon' />
												</div>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className='application-preview collapse' id='collapseExample'>
							<div className='preview-card'>
								<h3>Application preview</h3>
								<ul className='nav nav-tabs nav-justified' role='tablist'>
									<li className='nav-item'>
										<a className='nav-link active' data-toggle='tab' href='#personal-information-preview' role='tab' aria-selected='true'>
											Personal Information
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' data-toggle='tab' href='#loan-details-preview' role='tab' aria-selected='false'>
											Loan Details
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' data-toggle='tab' href='#work-details-preview' role='tab' aria-selected='false'>
											Work Details
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' data-toggle='tab' href='#bank-details-preview' role='tab' aria-selected='false'>
											Bank Details
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' data-toggle='tab' href='#other-details-preview' role='tab' aria-selected='false'>
											Other Details
										</a>
									</li>
								</ul>
								<div className='tab-content'>
									<div className='tab-pane fade show active' id='personal-information-preview' role='tabpanel'>
										<div className='container-fluid'>
											<div className='row'>
												<div className='col-md-4'>
													<label>Name</label>
													<p>Aakash Sharma</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
											</div>
											<hr className='custom-hr' />
											<h5 className='sub-heading'>Personal Address</h5>
											<div className='row'>
												<div className='col-md-4'>
													<label>Name</label>
													<p>Aakash Sharma</p>
												</div>
											</div>
										</div>
									</div>
									<div className='tab-pane fade' id='loan-details-preview' role='tabpanel'>
										<div className='container-fluid'>
											<div className='row'>
												<div className='col-md-4'>
													<label>Name</label>
													<p>Aakash Sharma</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
												<div className='col-md-4'>
													<label>sadad</label>
													<p>asdad</p>
												</div>
											</div>
											<h5 className='sub-heading'>Personal Address</h5>
											<hr className='custom-hr' />
											<div className='row'>
												<div className='col-md-6'>
													<div className='media'>
														<img src={AxisBank} className=' mr-4' alt='bank logo' />
														<div className='media-body align-self-center'>
															<h3>Axis Bank</h3>
															<h4>Interest Rate: 14.58%</h4>

															<p>Processing fee: 1.2%</p>
														</div>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='media'>
														<img src={AxisBank} className=' mr-4' alt='bank logo' />
														<div className='media-body align-self-center'>
															<h3>Axis Bank</h3>
															<h4>Interest Rate: 14.58%</h4>

															<p>Processing fee: 1.2%</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='tab-pane fade' id='work-details-preview' role='tabpanel'>
										...
									</div>
									<div className='tab-pane fade' id='bank-details-preview' role='tabpanel'>
										...
									</div>
									<div className='tab-pane fade' id='other-details-preview' role='tabpanel'>
										...
									</div>
								</div>
							</div>
					</div>*/}
					</div>
				</div>
			</div>
		);
	}
}

export default MyApplications;
