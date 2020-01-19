import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiList from "../../config/apiList.json";
import $ from "jquery";

import SimpleReactValidator from "simple-react-validator";

// API
import { signUp, sendOtp, signUp2, verifyPhone } from "../../services/auth";
import { personalProfileUpdate } from "../../services/userData";
import { applyLoan } from "../../services/loan";
import { employmentType } from "../../services/dropDown";
// library
import OTPInput, { ResendOTP } from "otp-input-react";

// images
import SignupImg from "../../images/a_icon_presearch.png";

// context
import { CoreStateContext } from "../../context/core";
import { setHomeData } from "../../context/core/core.actions";
class Signup extends Component {
	static contextType = CoreStateContext;
	constructor(props) {
		super(props);
		this.state = {
			otp: [],
			userStep: 0,
			name: "",
			phone: "",
			monthlyIncome: "",
			employmentType: null,
			employmentTypeDropDown: [],
			loanTenure: null,
			existingLoan: null,
			currentEmi: null,
			userId: "",
			accessToken: "",
			borrowerUuid: "",
			email: "",
			userData: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null
		};
		this.validator = new SimpleReactValidator();
	}
	resendOtp = () => {
		let userData = this.state.userData;
		let dataStringOtp = {
			access_token: userData.access_token,
			userId: userData.userId,
			phoneNumber: this.state.phone
		};
		sendOtp(dataStringOtp)
			.then(response => {
				console.log(response.data);
			})
			.catch(err => {
				alert(JSON.stringify(err));
			});
	};
	renderButton = buttonProps => {
		return <button {...buttonProps}>Resend</button>;
	};

	renderTime = remainingTime => {
		if (remainingTime > 1) {
			return <span>in {remainingTime}s</span>;
		}
	};

	// check if OTP entered is correct
	otpValid = () => {
		const self = this;
		if (this.state.otp.length < 6) {
			alert("Enter valid OTP");
		} else if (this.state.otp.length === 6) {
			let userData = this.state.userData;

			let dataString = {
				access_token: userData.access_token,
				otp: this.state.otp
			};
			verifyPhone(dataString)
				.then(res => res.data)
				.then(data => {
					if (data.code === "200") {
						self.setState({
							userStep: this.state.userStep + 1
						});
					} else {
						throw data;
					}
				})
				.catch(err => alert(JSON.stringify(err.message)));
		}
	};
	componentDidMount() {
		if (this.state.userData == null) {
			window.location.href = "/";
		}

		employmentType()
			.then(res => res.data)
			.then(data =>
				this.setState({
					employmentTypeDropDown: data
				})
			)
			.catch(err => {
				alert(JSON.stringify(err));
			});
	}

	signUpProcess = () => {
		let userData = this.state.userData;
		let dataString = {
			access_token: userData.access_token,
			loanPurposeUuid: userData.loanType.loanPurposeUuid,
			loanAmount: userData.loanAmount,
			loanTenure: this.state.loanTenure
		};
		console.log(` apply loan ${JSON.stringify(dataString)}`);
		applyLoan(dataString)
			.then(res => res.data)
			.then(data => {
				console.log(`res appyloan ${JSON.stringify(data)}`);
				if (data.code === "200") {
					let personalDataString = {
						access_token: this.state.userData.access_token,
						city: userData.city.value,
						jobType: this.state.employmentType,
						grossIncome: parseInt(this.state.monthlyIncome),
						monthlyEmiOnOutstandingLoans: this.state.currentEmi ? parseInt(this.state.currentEmi) : null
					};
					console.log(JSON.stringify(personalDataString));
					return signUp2(personalDataString);
				} else {
					alert(data.message);
				}
			})
			.then(response => {
				const data = response.data;
				console.log(` sign up ${JSON.stringify(data)}`);
				if (data.code === "200") {
					// window.location.href = "/dashboard/search";
					window.location.href = "/complete";
				} else {
					alert(data.message);
				}
			})
			.catch(error => alert(JSON.stringify(error)));
	};

	next = async () => {
		let userData = { ...this.state.userData };
		const self = this;
		switch (this.state.userStep) {
			case 0:
				if (this.validator.fieldValid("name") && this.validator.fieldValid("phone no") && this.validator.fieldValid("email")) {
					const nameString = this.state.name.split(" ");
					let dataString = {
						username: this.state.phone,
						password: "123456",
						confirmPassword: "123456",
						mobileNumber: this.state.phone,
						emailAddress: this.state.email,
						borrowerProfileTextVariable6: userData.age,
						firstName: nameString[0],
						middleName: nameString[2] ? nameString[2] : null,
						lastName: nameString[2] ? nameString[2] : nameString[1] ? nameString[1] : null
					};
					let signUpData = await signUp(dataString);
					signUpData = signUpData.data;
					console.log(JSON.stringify(signUpData));
					if (signUpData.code === "200") {
						userData.access_token = signUpData.access_token;
						userData.name = this.state.name;
						userData.userId = signUpData.userId;
						sessionStorage.setItem("userData", JSON.stringify(userData));
						let dataStringOtp = {
							access_token: signUpData.access_token,
							userId: signUpData.userId,
							phoneNumber: this.state.phone
						};
						sendOtp(dataStringOtp)
							.then(response => {
								console.log(response.data);
								self.setState({ userStep: self.state.userStep + 1, userData: userData });
							})
							.catch(err => {
								alert(JSON.stringify(err));
							});
					} else if (signUpData.code === "400") {
						alert(JSON.stringify(signUpData));
						// window.location.href = "/sign-in";
					}
				} else {
					this.validator.showMessageFor("name");
					this.validator.showMessageFor("phone no");
					this.validator.showMessageFor("email");
					this.forceUpdate();
				}
				break;
			case 1:
				this.otpValid();
				break;
			case 2:
				if (this.validator.fieldValid("employment type") && this.validator.fieldValid("monthly income")) {
					this.setState({
						userStep: this.state.userStep + 1
					});
				} else {
					this.validator.showMessageFor("employment type");
					this.validator.showMessageFor("monthly income");
					this.forceUpdate();
				}
				break;
			case 3:
				if (this.validator.fieldValid("loan tenure") && this.validator.fieldValid("existing loan")) {
					if (this.state.existingLoan === true) {
						if (this.validator.fieldValid("current emi")) {
							self.signUpProcess();
						} else {
							this.validator.showMessageFor("current emi");
							this.forceUpdate();
						}
					} else {
						self.signUpProcess();
					}
				} else {
					this.validator.showMessageFor("loan tenure");
					this.validator.showMessageFor("existing loan");
					this.forceUpdate();
				}
				break;
			default:
				window.location.href = "/";
		}
	};
	formatNumber = num => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};
	renderSwitch = param => {
		const { employmentTypeDropDown } = this.state;
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
							<div className='indi-form-text'>
								<input type='text' className='' name='name' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} id='name' autoComplete='off' required />

								<label htmlFor='name' className=' label-name'>
									<span className='content-name'>Email</span>
								</label>
							</div>
							<div className='error-block'>{this.validator.message("email", this.state.email, "required|email")}</div>
						</form>
						<div className='desc'>We’ll be sending you a 4 digit OTP on your phone number which will be verified before you proceed</div>
					</div>
				);
			case 1:
				return (
					<div className='col-xl-7 step-two'>
						<p>
							We have sent you a OTP to
							<br /> +91 {this.state.phone}
						</p>
						<button
							onClick={() => {
								this.setState({ userStep: this.state.userStep - 1 });
							}}
						>
							change
						</button>
						<div>
							<OTPInput value={this.state.otp} className='otp-input' onChange={e => this.setState({ otp: e })} OTPLength={6} otpType='number' disabled={false} />
							<ResendOTP className='resend-otp' renderTime={this.renderTime} renderButton={this.renderButton} onResendClick={this.resendOtp} />
						</div>
					</div>
				);
			case 2:
				return (
					<div className='col-xl-7 step-three'>
						<label>Employment type</label>
						<div className='radio-area'>
							{employmentTypeDropDown.map((item, key) => {
								return (
									<div className='custom-radios'>
										<input
											type='radio'
											name='gender'
											value={item.value}
											onClick={() => {
												this.setState({ employmentType: item.value });
											}}
										/>
										<div className='custom-check'></div>
										{/* <label>Retired</label> */}
										<label>{item.name}</label>
									</div>
								);
							})}
						</div>
						<div className='error-block'>{this.validator.message("employment type", this.state.employmentType, "required")}</div>

						<div className='indi-form-text'>
							<input type='text' className='' name='name' id='name' autoComplete='off' required value={this.state.monthlyIncome.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={e => this.setState({ monthlyIncome: e.target.value.replace(/\,/g, "") })} />
							<label htmlFor='name' className=' label-name'>
								{this.state.employmentType == "Self-Employed" ? <span className='content-name'>Approx. monthly income in rupees</span> : <span className='content-name'>Monthly income in rupees</span>}
							</label>
						</div>
						<div className='error-block'>{this.validator.message("monthly income", this.state.monthlyIncome, "required|integer")}</div>
						{this.state.employmentType == "Retired" && <div className='extraForRetired1'>Having a co-applicant is necessary to apply for a loan as a Retired personnel.</div>}
						{this.state.employmentType == "Retired" && <div className='extraForRetired2'>We’ll get in touch with to gather further information about your co-applicant.</div>}
					</div>
				);
			case 3:
				return (
					<div className='col-xl-7 step-four'>
						<div className='indi-form-text loan-tenure'>
							<input type='text' className='' name='name' id='name' autoComplete='off' required value={this.state.loanTenure} onChange={e => this.setState({ loanTenure: e.target.value })} />
							<label htmlFor='name' className=' label-name'>
								<span className='content-name'>Loan tenure ( in months )</span>
							</label>
						</div>
						<div className='error-block'>{this.validator.message("loan tenure", this.state.loanTenure, "required|integer")}</div>
						<label className='existing-loan'>Existing loan</label>
						<div className='radio-area'>
							<div className='custom-radios ' onClick={() => this.setState({ existingLoan: true })}>
								<label>
									<input type='radio' name='radio1' />
									<div className='custom-check'></div>
									Yes
								</label>
							</div>
							<div className='custom-radios' onClick={() => this.setState({ existingLoan: false })}>
								<label>
									{" "}
									<input type='radio' name='radio1' />
									<div className='custom-check'></div>
									No
								</label>
							</div>
						</div>
						<div className='error-block'>{this.validator.message("existing loan", this.state.existingLoan, "required|boolean")}</div>
						{this.state.existingLoan === true ? (
							<div className='indi-form-text emi'>
								{/* <input type='text' className='' name='name' id='name' autoComplete='off' required value={this.state.currentEmi.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={e => this.setState({ currentEmi: e.target.value.replace(/\,/g, "") })} /> */}
								<input type='text' className='' name='name' id='name' autoComplete='off' required value={this.state.currentEmi} onChange={e => this.setState({ currentEmi: e.target.value.replace(/\,/g, "") })} />
								<label htmlFor='name' className=' label-name'>
									<span className='content-name'>Current paying EMI</span>
								</label>
							</div>
						) : null}
						<div className='error-block'>{this.validator.message("current emi", this.state.currentEmi, "required|integer")}</div>
					</div>
				);
			default:
				return null;
		}
	};
	sendOtp = () => {
		sendOtp();
	};

	render() {
		const { userStep } = this.state;
		const firstStepContextVariable = this.context.commonState;
		console.log(firstStepContextVariable);
		// console.log(setHomeData)
		return (
			<div className='signup-modal'>
				<div className='conatiner'>
					<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h3 className='modal-title text-20-bold' onClick={this.test}>
									Sign up
								</h3>
								<Link className='close' to='/'>
									<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
										<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6'>
											<path d='M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4' />
										</g>
									</svg>
								</Link>
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
		);
	}
}

export default Signup;
