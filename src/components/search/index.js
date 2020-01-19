import React, { Component } from "react";
import Navigation from "../nav/dashboardNavigation";

import AxisBank from "../../images/Axis-Bank.png";
import EmptyBox from "../../images/empty-box.png";
import EigibiltyCheck from "../eligibiltyCheck/eligibilityCheck";

// API
import { fetchMatchingLoan, updateLoan } from "../../services/loan";
import { fetchUserDetailsAll } from "../../services/userData";
import InvestorCard from "./investorCard";
import EditModalBox from "./editModalBox";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			compareList: [],
			boxItems: [],
			matchingInvestorList: [],
			userData: "",
			profileData: ""
		};
	}
	componentDidMount() {
		this.getProfileData();
	}
	getProfileData = () => {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		let datastring = {
			access_token: userData.access_token
		};
		fetchUserDetailsAll(datastring)
			.then(res => res.data)
			.then(data => {
				// console.log(JSON.stringify(data));
				this.setState({
					profileData: data
				});
				return this.getMatchingLoans(data, userData);
			})
			.catch(err => alert(JSON.stringify(err.message)));
	};
	compareHandler = itemdata => {
		const currentCompareItems = this.state.compareList;

		let ifAlreadyExist = false;
		if (currentCompareItems.length > 0) {
			currentCompareItems.map(itemel => {
				// console.log(`${itemel.investorUuid} === ${itemdata.investorUuid}`);
				if (itemel.investorUuid === itemdata.investorUuid) {
					ifAlreadyExist = true;
				}
			});
		}

		if (ifAlreadyExist) {
			const tempArr = currentCompareItems.filter(el => {
				return el.investorUuid !== itemdata.investorUuid;
			});
			this.setState({
				compareList: tempArr
			});
		} else {
			if (currentCompareItems.length < 3) {
				currentCompareItems.push(itemdata);
				this.setState({
					compareList: currentCompareItems
				});
			} else {
				alert("You can compare 3 items");
			}
		}
	};

	removeFormCompare = id => {
		const tempArr = this.state.compareList.filter(el => {
			return el.id !== id;
		});
		this.setState({
			compareList: tempArr
		});
	};
	addToBox = itemValue => {
		let items = [...this.state.boxItems];
		let ifAlreadyExist = false;
		if (items.length > 0) {
			items.map(itemel => {
				if (itemel.investorUuid === itemValue.investorUuid) {
					ifAlreadyExist = true;
				}
			});
		}
		if (ifAlreadyExist) {
			alert("Already added to box");
		} else {
			items.push(itemValue);
			this.setState({
				boxItems: items
			});
		}
	};
	removeFromBox = itemValue => {
		const tempArr = this.state.boxItems.filter(el => {
			return el.investorUuid !== itemValue.investorUuid;
		});
		this.setState({
			boxItems: tempArr
		});
	};

	getMatchingLoans = (data, userData) => {
		// console.log(`---->>>${JSON.stringify(data)}     ---${JSON.stringify(userData)} `);
		let datastring = {
			access_token: userData.access_token,
			loanUuid: data.borrowerDetail.activeLoanUuid
		};
		fetchMatchingLoan(datastring)
			.then(res => {
				if (res.status === 200) {
					console.log(res.data.matchingInvestorList);
					this.setState({
						matchingInvestorList: res.data.matchingInvestorList
					});
				}
			})
			.catch(err => {
				alert(err.message);
			});
	};
	updateMatchingInvestor = loanElement => {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		let tempHold = "";
		loanElement.map(item => (tempHold = tempHold + " " + item.fullName));

		let datastring = {
			access_token: userData.access_token,
			loanUuid: this.state.profileData.borrowerDetail.activeLoanUuid,
			loanApplicationTextVariable5: tempHold
		};
		// console.log(JSON.stringify(datastring));

		updateLoan(datastring)
			.then(res => res.data)
			.then(data => JSON.stringify(data))
			.catch(err => alert(err));
	};
	render() {
		const { compareList, boxItems, matchingInvestorList, profileData } = this.state;
		return (
			<div className='container-fluid '>
				{profileData ? (
					<div className='row'>
						<div className='col-xl-2 p-0'>
							<Navigation nav={2} />
						</div>
						<div className='col-xl-8'>
							<div className='search-result container-fluid'>
								<div className='d-flex'>{/* <a href='#' className='back-button'>
										back
									</a> */}</div>
								<div className='heading-section d-flex justify-content-between align-items-center'>
									<div className='heading'>
										<h1>{profileData.loanApplications[0].loanDetails.purpose}</h1>
										<small>We found {matchingInvestorList ? matchingInvestorList.length : "0"} loan offers for you</small>
									</div>
									<div className='box' data-toggle='modal' data-target='#add-to-box-modal'>
										<svg xmlns='http://www.w3.org/2000/svg' width='30' height='32' viewBox='0 0 30 32'>
											<path
												fill='#6058F2'
												fillRule='evenodd'
												d='M29.986 7.544a.826.826 0 0 0-.082-.358.795.795 0 0 0-.557-.432L15.337.08a.845.845 0 0 0-.722 0L.468 6.815A.813.813 0 0 0 0 7.517V24.45c0 .31.179.594.468.73l14.147 6.733c.007 0 .007 0 .014.007.02.007.04.013.062.027.006 0 .013.007.027.007l.062.02c.007 0 .014.007.02.007.021.006.049.006.07.013h.02c.027 0 .062.007.09.007.027 0 .061 0 .089-.007h.02c.021 0 .049-.007.07-.013.006 0 .013-.007.02-.007l.062-.02c.007 0 .013-.007.027-.007.02-.007.041-.014.062-.027.007 0 .007 0 .014-.007l14.188-6.754a.816.816 0 0 0 .468-.73V7.565c-.014-.006-.014-.013-.014-.02zM14.972 1.71l12.27 5.842-4.518 2.154-12.27-5.842 4.518-2.154zm0 11.684L2.702 7.551l5.86-2.79 12.27 5.843-5.86 2.789zM1.651 8.854l12.496 5.95v15.082l-12.496-5.95V8.854zm14.147 21.032V14.805l5.866-2.797v3.945c0 .445.372.81.826.81a.82.82 0 0 0 .825-.81v-4.735l5.02-2.39v15.08l-12.537 5.978z'
											/>
										</svg>
										{boxItems.length > 0 ? <div className='box-count'>{boxItems.length}</div> : null}
									</div>
								</div>
								<div className='search-list'>
									{matchingInvestorList.map((value, key) => {
										return <InvestorCard loanAmount={profileData.loanApplications[0].loanDetails.loanAmount} investorUuid={value.investorUuid} addToBoxProp={() => this.addToBox(value)} compare={() => this.compareHandler(value)} saveLoan={() => this.updateMatchingInvestor([value])} />;
									})}
								</div>
							</div>
							{compareList.length > 0 ? (
								<div className='compare-bottom-area'>
									{compareList.length > 0 ? (
										<div className='item'>
											<img src={AxisBank} className='img-fluid' alt=""/>
											<button className='close' onClick={() => this.removeFormCompare(compareList[0].id)}>
												<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
													<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
														<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
													</g>
												</svg>
											</button>
										</div>
									) : (
										<div className='item unfilled'></div>
									)}
									{compareList.length > 1 ? (
										<div className='item'>
											<img src={AxisBank} className='img-fluid' alt=""/>
											<button className='close' onClick={() => this.removeFormCompare(compareList[1].id)}>
												<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
													<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
														<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
													</g>
												</svg>
											</button>
										</div>
									) : (
										<div className='item unfilled'></div>
									)}
									{compareList.length > 2 ? (
										<div className='item'>
											<img src={AxisBank} className='img-fluid' alt=""/>
											<button className='close' onClick={() => this.removeFormCompare(compareList[2].id)}>
												<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
													<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
														<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
													</g>
												</svg>
											</button>
										</div>
									) : (
										<div className='item unfilled'></div>
									)}

									<button className='compare-button' data-toggle='modal' data-target='#compare-modal'>
										compare
									</button>
								</div>
							) : null}
						</div>
						<div className='col-xl-2 pr-0'>
							<div className='filter-panel'>
								<div className='top-block'>
									<div className='filter-heading'>
										<div className='filters'>Filters</div>
										<button className='reset'>reset</button>
									</div>
									<div className='filter-type'>
										<ul className='nav nav-tabs nav-justified' role='tablist'>
											<li className='nav-item'>
												<a className='nav-link active' id='emi-tab' data-toggle='tab' href='#emi' role='tab' aria-controls='home' aria-selected='true'>
													Home
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link' id='tenure-tab' data-toggle='tab' href='#tenure' role='tab' aria-controls='tenure' aria-selected='false'>
													Profile
												</a>
											</li>
										</ul>
										<div className='tab-content'>
											<div className='tab-pane fade show active' id='emi' role='tabpanel' aria-labelledby='emi-tab'>
												<div className='emi-amount-form'>
													<h5>Enter EMI amount</h5>
													<div className='input-group emi-input'>
														<div className='input-group-prepend'>
															<span className='input-group-text'>₹</span>
														</div>
														<input type='text' className='form-control' aria-label='emi amount' />
														<div className='input-group-append'>
															<button className='input-group-text'> Go</button>
														</div>
													</div>
												</div>
												<hr className='hr-line-cutsom' />
												<div className='interest-rate'>
													<h5>Interest rate ( % )</h5>
													<input type='range' className='form-control-range' min='11' max='26' />
													<div className='range-count'>
														<div>11</div> <div>26</div>
													</div>
												</div>
											</div>
											<div className='tab-pane fade' id='tenure' role='tabpanel' aria-labelledby='tenure-tab'>
												<div className='emi-amount-form'>
													<h5>Enter EMI amount</h5>
													<div className='input-group emi-input'>
														<div className='input-group-prepend'>
															<span className='input-group-text'>₹</span>
														</div>
														<input type='text' className='form-control' aria-label='emi amount' />
														<div className='input-group-append'>
															<button className='input-group-text'> Go</button>
														</div>
													</div>
												</div>
												<hr className='hr-line-cutsom' />
												<div className='interest-rate'>
													<h5>Interest rate ( % )</h5>
													<input type='range' className='form-control-range' min='11' max='26' />
													<div className='range-count'>
														<div>11</div> <div>26</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bottom-block'>
									<div className='personal-heading'>
										<div className='title'>Personal Information</div>
										<button className='edit' data-toggle='modal' data-target='#edit-personal-info-search'>
											edit
										</button>
									</div>
									{profileData ? (
										<div className='user-detail'>
											<div className='label-title'>Age</div>
											<div className='content'>{profileData.borrowerDetail.borrowerProfileTextVariable6}</div>
											<div className='label-title'>City</div>
											<div className='content'>{profileData.loanApplications[0].loanDetails.city}</div>
											<div className='label-title'>Loan amount</div>
											<div className='content'>{profileData.loanApplications[0].loanDetails.loanAmount}</div>
											<div className='label-title'>Monthly income</div>
											<div className='content'>{profileData.borrowerDetail.grossIncome}</div>
											<div className='label-title'>Employment type</div>
											<div className='content'>{profileData.borrowerDetail.jobType}</div>
											<div className='label-title'>Do you have an existing loan?</div>
											<div className='content'>{profileData.borrowerDetail.monthlyEmiOnOutstandingLoans === 'Rs0'?'No':profileData.borrowerDetail.monthlyEmiOnOutstandingLoans}</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				) : null}
				{/* Features moada, box */}
				<div className='modal fade' id='view-all-features' tabindex='-1' role='dialog' aria-labelledby='view-all-features' aria-hidden='true'>
					<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
						<div className='modal-content'>
							<header>
								<div className='media'>
									<img src={AxisBank} className='align-self-center mr-4' alt='bank logo' />
									<div className='media-body'>
										<h3>Axis Bank</h3>
										<h4>Interest Rate: 14.58%</h4>

										<div className='detail-list'>
											<div className='emi'>
												<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>
													<g fill='none' fillRule='evenodd' stroke='#54527B' strokeLinecap='round' strokeLinejoin='round' strokeWidth='.7'>
														<path d='M11.642 14.118h-8.57a1.04 1.04 0 0 1-1.037-1.037V1.797C2.035 1.227 2.5.76 3.07.76h8.571c.57 0 1.037.467 1.037 1.037v11.284a1.04 1.04 0 0 1-1.037 1.037z' />
														<path d='M10.364 4.754H4.636C4.286 4.754 4 4.4 4 3.968v-.182C4 3.354 4.286 3 4.636 3h5.728c.35 0 .636.354.636.786v.182c0 .432-.286.786-.636.786zM5.974 8.951H4.791a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.183A.62.62 0 0 1 6.596 8v.328a.62.62 0 0 1-.622.622zM9.923 8.951H8.739a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.184a.62.62 0 0 1 .622.622v.328a.63.63 0 0 1-.622.622zM5.974 11.69H4.791a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.183a.62.62 0 0 1 .622.622v.328a.62.62 0 0 1-.622.622zM9.923 11.69H8.739a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.184a.62.62 0 0 1 .622.622v.328a.63.63 0 0 1-.622.622z' />
													</g>
												</svg>
												EMI: ₹ 2,189
											</div>
											<div className='separator-line'></div>
											<div className='tenure'>
												<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>
													<g fill='none' fillRule='evenodd' stroke='#54527B' strokeLinecap='round' strokeLinejoin='round' strokeWidth='.7'>
														<path d='M13.772 2.774c0-.514-.353-.935-.784-.935H2.208c-.432 0-.784.42-.784.935v9.89c0 .514.352.935.784.935h10.78c.43 0 .784-.42.784-.935v-9.89zM3.763 1.039v1.474M11.446 1.039v1.474M1.424 4.915h12.348' />
													</g>
												</svg>
												Tenure: 1-3 years
											</div>
											<div className='separator-line'></div>
											<div className='fee'>
												<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>
													<g fill='none' fillRule='evenodd' stroke='#54527B' strokeLinecap='round' strokeLinejoin='round'>
														<g strokeWidth='.7'>
															<path d='M3.041 6.145L1.474 7.61.05 6.094M1.525 6.963A5.882 5.882 0 0 1 7.41 1.077' />
														</g>
														<g strokeWidth='.7'>
															<path d='M11.67 7.79l1.67-1.355 1.303 1.618' />
															<path d='M13.23 7.074a5.895 5.895 0 0 1-2.752 4.983 5.894 5.894 0 0 1-3.144.903' />
														</g>
														<g strokeWidth='.84'>
															<path d='M6.02 4.103h3.64M6.02 5.483h3.64M7.288 4.082s1.319.03 1.319 1.492c0 1.288-1.33 1.33-1.33 1.33H6.45l2.218 2.524' />
														</g>
													</g>
												</svg>
												Processing fee: 1.2%
											</div>
										</div>
									</div>
								</div>
							</header>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>
									<svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'>
										<defs>
											<filter id='a' width='121.7%' height='132.2%' x='-10.9%' y='-16.1%' filterUnits='objectBoundingBox'>
												<feOffset dy='15' in='SourceAlpha' result='shadowOffsetOuter1' />
												<feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='12.5' />
												<feColorMatrix in='shadowBlurOuter1' result='shadowMatrixOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0' />
												<feMerge>
													<feMergeNode in='shadowMatrixOuter1' />
													<feMergeNode in='SourceGraphic' />
												</feMerge>
											</filter>
										</defs>
										<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6' filter='url(#a)' transform='translate(-662 -30)'>
											<path d='M664.55 32.55l11.9 11.9M676.45 32.55l-11.9 11.9' />
										</g>
									</svg>
								</span>
							</button>

							<div className='modal-body'>
								<ul className='nav nav-tabs nav-justified' id='myTab' role='tablist'>
									<li className='nav-item'>
										<a className='nav-link active' id='features-tab' data-toggle='tab' href='#features' role='tab' aria-controls='features' aria-selected='true'>
											Features
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' id='document-tab' data-toggle='tab' href='#document' role='tab' aria-controls='document' aria-selected='false'>
											Documents required
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' id='fees-tab' data-toggle='tab' href='#fees' role='tab' aria-controls='fees' aria-selected='false'>
											Fees and charges
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' id='eligibilty-tab' data-toggle='tab' href='#eligibilty' role='tab' aria-controls='eligibilty' aria-selected='false'>
											Eligibilty
										</a>
									</li>
								</ul>
								<div className='tab-content'>
									<div className='tab-pane fade show active' id='features' role='tabpanel' aria-labelledby='features-tab'>
										<ul>
											<li>You should be an Indian citizen</li>
											<li>You should be in the age group of 21-60 years</li>
										</ul>
									</div>
									<div className='tab-pane fade' id='document' role='tabpanel' aria-labelledby='document-tab'>
										...
									</div>
									<div className='tab-pane fade' id='fees' role='tabpanel' aria-labelledby='fees-tab'>
										...
									</div>
									<div className='tab-pane fade' id='eligibilty' role='tabpanel' aria-labelledby='eligibilty-tab'>
										...
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-primary'>
									Add to box
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* compare modal box */}
				<div className='modal fade compare-modal' id='compare-modal' tabindex='-1' role='dialog' aria-hidden='true'>
					<div className='modal-dialog modal-dialog-centered modal-xl' role='document'>
						<div className='modal-content'>
							<div className='modal-body'>
								<h5>Compare offers</h5>
								<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
									<span aria-hidden='true'>
										<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
											<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
												<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
											</g>
										</svg>
									</span>
								</button>
								<hr className='custom-hr' />
								<table className='table'>
									<tbody>
										<tr className='no-border'>
											<th scope='row'>Bank</th>
											<td>
												<img src={AxisBank} className='img-fluid' alt=""/>
											</td>
											<td>
												<img src={AxisBank} className='img-fluid' alt="" />
											</td>
											<td>
												<img src={AxisBank} className='img-fluid' alt="" />
											</td>
										</tr>
										<tr className='rate-interest'>
											<th scope='row'>Rate of interest</th>
											<td>18.3%</td>
											<td>18.3%</td>
											<td>@18.3%</td>
										</tr>
										<tr>
											<th scope='row'>Processing fee</th>
											<td>2.8%</td>
											<td>2.8%</td>
											<td>@2.8%</td>
										</tr>
										<tr>
											<th scope='row'>Special documents</th>
											<td>NOC by builder</td>
											<td>NOC by builder</td>
											<td>@NOC by builder</td>
										</tr>
										<tr>
											<th scope='row'>Features</th>
											<td>For both Salaried and self Employed</td>
											<td>Flexibility part payment facility available</td>
											<td>Flexibility part payment facility available</td>
										</tr>
										<tr className='no-border'>
											<th scope='row'></th>
											<td>
												<button>Add to box</button>
											</td>
											<td>
												<button>Add to box</button>
											</td>
											<td>
												<button>Add to box</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/* compare modal box */}
				<div className='modal fade add-to-box-modal' id='add-to-box-modal' tabindex='-1' role='dialog' aria-hidden='true'>
					<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
						<div className='modal-content'>
							<div className='modal-body'>
								<h5>Compare offers</h5>
								<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
									<span aria-hidden='true'>
										<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
											<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
												<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
											</g>
										</svg>
									</span>
								</button>
								<hr className='custom-hr' />

								{boxItems.map((value, key) => {
									return (
										<div className='box-row custom-media-row'>
											<div className='media cutsom-media'>
												<img src={AxisBank} className='align-self-center mr-4' alt='bank logo' />
												<div className='media-body'>
													<h3>Axis Bank</h3>
													<h4>Interest Rate: 14.58%</h4>
												</div>
											</div>
											<button className='pri-btn' onClick={() => this.removeFromBox(value)}>
												remove
											</button>
										</div>
									);
								})}

								{boxItems.length > 0 ? (
									<div>
										<button className='proceed-button' data-dismiss='modal' data-toggle='modal' data-target='#eligibility-check-modal' onClick={() => this.updateMatchingInvestor(this.state.boxItems)}>
											process
										</button>
									</div>
								) : (
									<div className='empty-box'>
										<img src={EmptyBox} className='img-fluid' alt='empty-card' />
										<p>You don’t have any loans in your box yet. You need to add at least one offer to contiue with your application.</p>
										<button className='okay-button' data-dismiss='modal'>
											okay!
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* start  eligibility check modal box */}

				<div class='modal fade bd-example-modal-lg eligibility-check-modal' id='eligibility-check-modal' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel' aria-hidden='true'>
					<div class='modal-dialog-centered modal-dialog modal-lg' role='document'>
						<div class='modal-content'>
							<EigibiltyCheck profileData={this.state.profileData} />
						</div>
					</div>
				</div>
				{/* end  eligibility check modal box */}

				{profileData ? <EditModalBox profileData={profileData} /> : null}
			</div>
		);
	}
}

export default Search;
