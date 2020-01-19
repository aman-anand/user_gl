import React, { Component } from "react";

import { investorDetails } from "../../services/investor";
import AxisBank from "../../images/Axis-Bank.png";
class InvestorCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			investorUuid: this.props.investorUuid,
			details: "",
			investorLogo: "",
			loanAmount:this.props.loanAmount
		};
	}
	componentDidMount() {
		const userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null;
		let dataString = {
			investorUuid: this.state.investorUuid,
			access_token: userData.access_token
		};
		investorDetails(dataString)
			.then(res => res.data)
			.then(data => {
				this.setState({
					details: data.investorDetails,
					investorLogo: data.profilePicDownloanUrl
				});
			})
			.catch(err => alert(JSON.stringify(err)));
	}

	render() {
		const { details, investorLogo,loanAmount } = this.state;


		return (
			<div className='search-list-item'>
				{details ? (
					<React.Fragment>
						<div className='top-section'>
							<div className='left'>
								<div className='media'>
									<img src={investorLogo} className='align-self-center mr-4' alt='bank logo' />
									<div className='media-body'>
										<h3>{details.firstName}</h3>
										<h4>Interest Rate: {details.maxRateOfInterest}%</h4>

										<div className='custom-checkbox'>
											<label>
												<input type='checkbox' name='add-to-compare' onClick={this.props.compare} />
												<div className='custom-check'></div>
												Add to compare
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className='right'>
								<button className='apply-now' type='button' data-toggle='modal' data-target='#eligibility-check-modal' onClick={this.props.saveLoan}>
									Apply now
								</button>
								<button className='add-to-box' onClick={this.props.addToBoxProp}>
									add to box
								</button>
							</div>
						</div>
						<div className='middle-section'>
							<div className='emi'>
								<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>
									<g fill='none' fillRule='evenodd' stroke='#54527B' strokeLinecap='round' strokeLinejoin='round' strokeWidth='.7'>
										<path d='M11.642 14.118h-8.57a1.04 1.04 0 0 1-1.037-1.037V1.797C2.035 1.227 2.5.76 3.07.76h8.571c.57 0 1.037.467 1.037 1.037v11.284a1.04 1.04 0 0 1-1.037 1.037z' />
										<path d='M10.364 4.754H4.636C4.286 4.754 4 4.4 4 3.968v-.182C4 3.354 4.286 3 4.636 3h5.728c.35 0 .636.354.636.786v.182c0 .432-.286.786-.636.786zM5.974 8.951H4.791a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.183A.62.62 0 0 1 6.596 8v.328a.62.62 0 0 1-.622.622zM9.923 8.951H8.739a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.184a.62.62 0 0 1 .622.622v.328a.63.63 0 0 1-.622.622zM5.974 11.69H4.791a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.183a.62.62 0 0 1 .622.622v.328a.62.62 0 0 1-.622.622zM9.923 11.69H8.739a.62.62 0 0 1-.622-.622v-.328a.62.62 0 0 1 .622-.622h1.184a.62.62 0 0 1 .622.622v.328a.63.63 0 0 1-.622.622z' />
									</g>
								</svg>
								EMI: ₹ {((parseFloat(loanAmount)+((parseFloat(details.maxRateOfInterest)/100)*parseFloat(loanAmount)))/parseFloat(details.maxLoanDuration)).toFixed()}
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
						<div className='bottom-button' data-toggle='modal' data-target='#view-all-features'>
							View all features
						</div>
					</React.Fragment>
				) : null}
			</div>
		);
	}
}

export default InvestorCard;
