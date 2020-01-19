import React, { Component } from "react";
import ApiList from "../../config/apiList.json";
import $ from "jquery";

import SimpleReactValidator from "simple-react-validator";

// API
import { signIn, sendOtp } from "../../services/auth";

// library
import OTPInput, { ResendOTP } from "otp-input-react";

// images
import SignupImg from "../../images/a_icon_presearch.png";

// context
// import { commonContext } from '../../context/conmonContext'

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otp: [],
			userStep: 0,
			name: "",
			phone: "",
			monthlyIncome: "",
			employmentType: null,
			loanTenure: null,
			existingLoan: null,
			currentEmi: null,
			userId: "",
			accessToken: "",
			borrowerUuid: "",
			verifyOtp:''
		};
		this.validator = new SimpleReactValidator();
	}
	resendOtp = () => {
		alert("OTP resend");
	};
	renderButton = buttonProps => {
		return <button {...buttonProps}>Resend</button>;
	};
	renderTime = remainingTime => {
		if (remainingTime > 1) {
			return <span>in {remainingTime}s</span>;
		}
	};


	next = async () => {
		const self = this;
		switch (this.state.userStep) {
			case 0:
				if (this.validator.fieldValid("name") && this.validator.fieldValid("phone no")) {
					let dataString = {
						username: this.state.phone,
						password: "123456"
					};
					signIn(dataString)
						.then(res => res.data)
						.then(data => {
							if (data.code === "200") {
								let dataStringOtp = {
									access_token: data.access_token,
									userId: data.userId,
									phoneNumber: this.state.phone
								};
								return sendOtp(dataStringOtp);
							} else {
								throw data;
							}
						})
						.then(resOtp => resOtp.data)
						.then(dataOtp => {
							if (dataOtp.code === "200") {
								self.setState({ userStep: self.state.userStep + 1 });
							}
						})
						.catch(err => alert(err.message));
				} else {
					this.validator.showMessageFor("name");
					this.validator.showMessageFor("phone no");
					this.forceUpdate();
				}
				break;
			case 1:
				break;
			default:
				window.location.href = "/";
		}
	};
	formatNumber = num => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};
	renderSwitch = param => {
		switch (param) {
			case 0:
				return (
					<div className='col-xl-7'>
						<form className='form-group'>
							<div className='indi-form-text'>
								<input type='text' className='' name='name' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} id='name' autoComplete='off' required />

								<label htmlFor='name' className=' label-name'>
									<span className='content-name'>Name</span>
								</label>
							</div>
							<div className='error-block'>{this.validator.message("name", this.state.name, "required|alpha_space")}</div>
							<div className='indi-form-text'>
								<input type='tel' className='form-control' value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} name='name' id='name' autoComplete='off' required />
								<label htmlFor='name' className='form-label label-name'>
									<span className='content-name'>10 digit phone number</span>
								</label>
							</div>
							<div className='error-block'>{this.validator.message("phone no", this.state.phone, "required|phone")}</div>
						</form>
						<div className='desc'>We’ll be sending you a 4 digit OTP on your phone number which will be verified before you proceed</div>
					</div>
				);
			case 1:
				this.verifyOtp()
				return (
					<div className='col-xl-7 step-two'>
						<p>
							We have sent you a OTP to
							<br /> +91 {this.state.phone}
						</p>
						<button>change</button>
						<div>
							<OTPInput value={this.state.otp} className='otp-input' onChange={e => this.setState({ otp: e })} OTPLength={4} otpType='number' disabled={false} />
							<ResendOTP className='resend-otp' renderTime={this.renderTime} renderButton={this.renderButton} onResendClick={this.resendOtp} />
							{/* Hi {accessToken} */}
						</div>
					</div>
					// </CommonConsumer>
				);
			default:
				return null;
		}
	};

	verifyOtp=()=>{
		
	}

	render() {
		const { userStep } = this.state;
		console.log("Working");

		return (
			<>
				<div className='signup-modal'>
					<div className='conatiner'>
						<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h3 className='modal-title text-20-bold'>Sign In</h3>
								</div>
								<div className='progress'>
									<div className='progress-bar' role='progressbar' style={{ width: `${userStep * 25}%` }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
								</div>

								<div className='modal-body'>
									{/* Signup step one */}
									<div className='container-fluid step-one'>
										<div className='row align-items-center justify-content-between'>
											{this.renderSwitch(userStep)}
											<div className='col-xl-4'>
												<img src={SignupImg} alt='sign-up' className='img-fluid' />
											</div>
										</div>
										<footer className='row justify-content-between'>
											{userStep !== 0 ? (
												<button className='secondary-cta' onClick={() => this.setState({ userStep: userStep - 1 })}>
													back
												</button>
											) : (
												<div></div>
											)}
											<button className='primary-button' onClick={this.next}>
												next
											</button>
										</footer>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default SignIn;
