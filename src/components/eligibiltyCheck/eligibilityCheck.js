import React, { Component } from "react";
import Logo from "../../images/download.svg";
import StatementIcon1 from "../../images/hl-02.svg";
import StatementIcon2 from "../../images/hl-03.svg";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import { loanDropDown, cityList } from "../../services/dropDown";
import InputMask from "react-input-mask";
import "react-select/dist/react-select.css";
import VirtualizedSelect from "react-virtualized-select";
import OTPInput, { ResendOTP } from "otp-input-react";
import { FilePond } from "react-filepond";
import CreditHistory from "../../images/credit-history.svg";
import BankStatement from "../../images/basic-icons-01-copy-21.svg";
import CreditScore from "../../images/credit-score.svg";
import Perfios from "../../images/perfios-logo.png";
import Experian from "../../images/Experian_New Logo.svg";
import ReactSpeedometer from "react-d3-speedometer";
import { personalProfileUpdate } from "../../services/personalProfileUpdate";
import { profileUpdate } from "../../services/profileUpdate";
import { fetchUserDetails, fetchCreditScore } from "../../services/userData";
import moment from "moment";

import ContinueLaterModal from "./continueModal";

// API
import { startOnlineBanking } from "../../services/perfios";
class EigibiltyCheck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loanCheck: null,
			CreditCard: null,
			conditionCheck: 0,
			bankStatement: false,
			checked: false,
			otp: [],
			firstname: "",
			lastname: "",
			email: "",
			profession: "",
			gender: null,
			dateOfBirth: "",
			panNumber: "",
			adharNumber: "",
			addressFirst: "",
			addressSecond: "",
			landmark: "",
			city: "",
			state: "",
			mobileno: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).phone : null,
			dependent: "",
			score: 600,
			color: "",
			bankstate: "",
			genderText: "",
			userData: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null,
			profileData: props.profileData,
			cityOptions: "",
			loanUuid: ""
		};
		this.validator = new SimpleReactValidator();
	}

	handleInit() {
		console.log("FilePond instance has initialised", this.pond);
	}
	componentDidMount(){
		this.cityList();
		let dataString = {
			access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
		};
		let borrowerDetails = fetchUserDetails(dataString);
		console.log(borrowerDetails);
		borrowerDetails.then(res => {
			console.log(res)
			this.setState({
				loanUuid: res.data.borrowerDetail.activeLoanUuid
			})
		})
		.catch(err => {
			alert(err)
		})
	}
	cityList = () => {
		cityList()
			.then(res => res.data)
			.then(data => {
				if (data.code === "200") {
					let tempHold = [];
					console.log(data);

					data.cityList.map((value, key) => {
						tempHold.push({ label: value.name, value: value.name, state: value.state });
					});
					this.setState({
						cityOptions: tempHold
					});
				}
			})
			.catch(err => alert(err));
	};
	next = e => {
		e.preventDefault();

		switch (this.state.conditionCheck) {
			case 0:
				if (this.validator.fieldValid("loanCheck") && this.validator.fieldValid("CreditCard")) {
					if (this.state.conditionCheck < 6) {
						this.setState({ conditionCheck: this.state.conditionCheck + 1 });
					}
				} else {
					this.validator.showMessageFor("loanCheck");
					this.validator.showMessageFor("CreditCard");
					this.forceUpdate();
				}

				break;
			case 1:
				if (this.state.bankStatement) {
					if (this.state.conditionCheck < 5) {
						this.setState({ conditionCheck: this.state.conditionCheck + 1 });
					}
				}
				break;
			case 2:
				if (this.state.bankstate.length < 3) {
					this.validator.showMessageFor("enter 3 file");
					this.forceUpdate();
				} else {
					if (this.state.conditionCheck < 5) {
						this.setState({ conditionCheck: this.state.conditionCheck + 1 });
					}
					if (this.state.loanCheck === 2 && this.state.CreditCard === 2) {
						window.location.href = "/application/personal-information";
					}
				}

				break;
			case 3:
				if (
					this.validator.fieldValid("first name") &&
					this.validator.fieldValid("last name") &&
					this.validator.fieldValid("dateOfBirth") &&
					this.validator.fieldValid("city") &&
					this.validator.fieldValid("panNumber") &&
					this.validator.fieldValid("addressFirst") &&
					this.validator.fieldValid("addressSecond") &&
					this.validator.fieldValid("mobile no") &&
					this.validator.fieldValid("gender")
				) {
					if (this.state.gender === 1) {
						this.setState({
							genderText: "Male"
						});
					}
					if (this.state.gender === 2) {
						this.setState({
							genderText: "Female"
						});
					}
					if (this.state.gender === 3) {
						this.setState({
							genderText: "Other"
						});
					}
					if (this.state.conditionCheck < 5) {
						let dataString = {
							access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
							city: this.state.city,
							addressOneLine1: this.state.addressFirst,
							addressTwoLine1: this.state.addressSecond,
							firstName: this.state.firstname,
							lastname: this.state.lastname,
							gender: this.state.genderText,
							dateOfBirth: this.state.dateOfBirth,
							identityNumberTwo: this.state.panNumber
						};
						let personalProfileUpdateData = profileUpdate(dataString);
						console.log(personalProfileUpdateData);
						personalProfileUpdateData.then(res => {
							console.log(res);
							if (res.data.code === "200") {
								this.setState({ conditionCheck: this.state.conditionCheck + 1 });
							}
							else {
								alert(res.data.message)
							}
						});
						// this.setState({ conditionCheck: this.state.conditionCheck + 1 });
					}
				} else {
					this.validator.showMessages();

					this.forceUpdate();
				}

				break;
			case 4:
				if (this.state.otp.length < 4) {
					this.validator.showMessageFor("otp invalid");
					this.forceUpdate();
				} else {
					if (this.state.conditionCheck < 5) {
						let dataString = {
							access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
							loanUuid: this.state.loanUuid
						};
						let fetchCreditScoreData = fetchCreditScore(dataString);
						console.log(fetchCreditScoreData);
						fetchCreditScoreData.then(res => {
							console.log(res)
							if(res.data.code === '200'){
								this.setState({ conditionCheck: this.state.conditionCheck + 1 });
							}
							if(res.data.error){
								alert(res.data.error)
							}
						})
						.catch(err => {
							alert(err)
						})
					}
				}

				if(this.state.score <=300){
					this.setState({ color: '#FB6363' });
				}
				else if(this.state.score <=600){
					this.setState({ color: '#FFB23D' });
				}
				else{
					this.setState({ color: '#04D1AE' });
				}
				break;
			case 5:
				window.location.href = "/application/personal-information";

				break;

			default:
				window.location.href = "/application/personal-information";
		}
	};
	bankStatementCheck = e => {
		e.preventDefault();
		this.setState({ bankStatement: (this.state.bankStatement = true) });
	};
	
	back = e => {
		e.preventDefault();
		if (this.state.conditionCheck > 0) {
			this.setState({ conditionCheck: this.state.conditionCheck - 1 });
		}
	};
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

	render() {
		const { userData } = this.state;
		let { profileData } = this.props;
		const loanDetails = profileData.loanApplications ? profileData.loanApplications[0].loanDetails : null;
		let eligibilityForOnline = false;
		console.log(JSON.stringify(loanDetails));
		if (loanDetails && loanDetails.borrowerEmail !== null && loanDetails.loanAmount !== null && loanDetails.loanTenureInMonths !== null && loanDetails.purpose !== null) {
			eligibilityForOnline = true;
		}
		const options = this.state.cityOptions;

		return (
			<div className='eligibility container '>
				<div className='header-part align-items-center justify-content-between'>
					{this.state.conditionCheck === 0 && <h3 className='main-heading text-20-bold'>Loan eligibilty</h3>}
					{this.state.conditionCheck === 1 && <h3 className='main-heading text-20-bold'>Eligibility check by Perfios</h3>}
					{this.state.conditionCheck === 2 && <h3 className='main-heading text-20-bold'>Bank statements upload</h3>}

					{this.state.conditionCheck >= 3 && <h3 className='main-heading text-20-bold'>Credit report check by Experian</h3>}
					<button type='button' class='close' data-toggle='modal' data-target='#continueModal' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
				</div>
				<div className='row'>
					<div className='col-xl-4 left-part'>
						{this.state.conditionCheck === 0 && (
							<ul class='steps'>
								<li>
									<div class='title'>
										<span className='step-number active text-14-semibold'>
											<img src={CreditHistory} />
										</span>
										<span className='step-text '>Credit history</span>
									</div>
								</li>

								<li>
									<div class='title'>
										<span className='step-number  text-14-semibold'>
											<img src={BankStatement} />
										</span>
										<span class='step-text '>Bank statements</span>
									</div>
								</li>
								<li>
									<div class='title'>
										<span class='step-number text-14-semibold'>
											<img src={CreditScore} />
										</span>
										<span class='step-text '>Credit score</span>
									</div>
								</li>
							</ul>
						)}
						{this.state.conditionCheck <= 2 && (
							<div className='imag-div'>
								{" "}
								<img src={Perfios} />
							</div>
						)}
						{this.state.conditionCheck >= 3 && (
							<div className='imag-div'>
								{" "}
								<img src={Experian} />
							</div>
						)}
						{this.state.conditionCheck > 0 && (
							<ul class='steps'>
								<li>
									<div class='title'>
										<span className={this.state.conditionCheck == 0 ? "step-number active text-14-semibold" : "step-number complete text-14-semibold"}>
											<img src={CreditHistory} />
										</span>
										<span className='step-text '>Credit history</span>
									</div>
								</li>

								<li>
									<div class='title'>
										<span className={this.state.conditionCheck == 1 || this.state.conditionCheck == 2 ? "step-number active text-14-semibold" : "step-number complete text-14-semibold"}>
											<img src={BankStatement} />
										</span>
										<span class='step-text '>Bank statements</span>
									</div>
								</li>
								<li>
									<div class='title'>
										{this.state.conditionCheck < 3 ? (
											<span className='step-number text-14-semibold'>
												<img src={CreditScore} />
											</span>
										) : (
											<span className={this.state.conditionCheck < 5 ? "step-number active text-14-semibold" : "step-number complete text-14-semibold"}>
												<img src={CreditScore} />
											</span>
										)}
										<span class='step-text '>Credit score</span>
									</div>
								</li>
							</ul>
						)}
					</div>
					<div className='col-xl-8 right-part'>
						<form>
							{this.state.conditionCheck === 0 && (
								<div className='checksection'>
									<div className='row radio-grp'>
										<div className=' col-xl-12'>
											<label>Have you taken any loan before?</label>
											<div className='radio-area'>
												<div className='custom-radios'>
													<input
														type='radio'
														name='loanCheck'
														value='Yes'
														onClick={() => {
															this.setState({ loanCheck: 1 });
														}}
													/>
													<div className='custom-check'></div>
													<label>Yes</label>
												</div>
												<div className='custom-radios'>
													<input
														type='radio'
														name='loanCheck'
														value='No'
														onClick={() => {
															this.setState({ loanCheck: 2 });
														}}
													/>
													<div className='custom-check'></div>
													<label>No</label>
												</div>
											</div>
											<div className='error-block'>{this.validator.message("loanCheck", this.state.loanCheck, "required|integer")}</div>
										</div>
									</div>

									<div className='line'></div>
									<div className='row radio-grp'>
										<div className=' col-xl-12'>
											<label>Do you have a credit card?</label>
											<div className='radio-area'>
												<div className='custom-radios'>
													<input
														type='radio'
														name='CreditCard'
														value='Yes'
														onClick={() => {
															this.setState({ CreditCard: 1 });
														}}
													/>
													<div className='custom-check'></div>
													<label>Yes</label>
												</div>
												<div className='custom-radios'>
													<input
														type='radio'
														name='CreditCard'
														value='No'
														onClick={() => {
															this.setState({ CreditCard: 2 });
														}}
													/>
													<div className='custom-check'></div>
													<label>No</label>
												</div>
											</div>

											<div className='error-block'>{this.validator.message("CreditCard", this.state.CreditCard, "required|integer")}</div>
										</div>
									</div>
								</div>
							)}

							{this.state.conditionCheck === 1 && (
								<div className='first-eligibility-section'>
									<h3 className='text-14-bold'>Choose either of the two options to proceed</h3>
									{eligibilityForOnline && (
										<form action='http://localhost:4000/v1/perfios/insights/start' method='post'>
											<input type='hidden' name='destination' value='netbankingFetch' />
											<input type='hidden' name='txnId' value={userData.access_token} />
											<input type='hidden' name='emailId' value='ashish.saiwal@procreator.in' />
											<input type='hidden' name='transactionCompleteCallbackUrl' value='http://4458cca5.ngrok.io/v1/perfios/insights/transactionCompleteCallback' />
											<input type='hidden' name='loanAmount' value={loanDetails.loanAmount} />
											<input type='hidden' name='loanDuration' value={loanDetails.loanTenureInMonths} />
											<input type='hidden' name='loanType' value={loanDetails.purpose} />
											<input type='hidden' name='returnUrl' value='http://localhost:3000/application/personal-information?txnId=%s&status=%s' />
											<button type='submit' className='card-sec align-items-center'>
												<img src={StatementIcon1} />
												<div className='right-sec'>
													<div className='main-heading text-18-bold'>Use netbanking</div>
													<p className='text-14-semibold mb-0'>Click to login to net-banking for validating bank account details</p>
												</div>
											</button>
										</form>
									)}
									<button className='card-sec align-items-center' onClick={this.bankStatementCheck}>
										<img src={StatementIcon2} />
										<div className='right-sec'>
											<div className='main-heading text-18-bold'>Upload statements</div>
											<p className='text-14-semibold mb-0'>Click to manually upload last three months bank statements in PDF format</p>
										</div>
									</button>
								</div>
							)}
							{this.state.conditionCheck === 2 && (
								<div className='second-eligibility-section'>
									<h3 className='text-16-bold mb-0'>Last 3 month bank statements</h3>
									<p className='text-12-semibold'>We’ll need a clear photo or a PDF document of the above</p>

									<FilePond
										allowMultiple={true}
										maxFiles={3}
										oninit={() => this.handleInit()}
										onupdatefiles={fileItems => {
											// Set currently active file objects to this.state
											this.setState({
												bankstate: fileItems.map(fileItem => fileItem.file)
											});
										}}
										labelIdle='<div class="row"> <div class="col-xl-12 dropRectangle d-flex align-items-center"><div class="  dropImg"  style="backgroundImage:url(Upload})"><?xml version="1.0" encoding="UTF-8"?>
                                                                                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                            <!-- Generator: sketchtool 58 (101010) - https://sketch.com -->
                                                                                            <title>9AF3E670-1087-4C5E-A667-CBB27B56C890@1.00x</title>
                                                                                            <desc>Created with sketchtool.</desc>
                                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="#6058f2" fill-rule="evenodd">
                                                                                                <g id="atom/icon/upload" transform="translate(0.000000, -2.000000)" fill="#6058f2">
                                                                                                    <g id="Upload" transform="translate(0.000000, 2.000000)">
                                                                                                        <path d="M19.7070603,5.40681167 C19.5536575,5.40681167 19.4010154,5.41496021 19.2493875,5.43176658 C19.1652062,3.48502918 17.4955246,1.92585676 15.4551407,1.92585676 C14.7908179,1.92585676 14.1399337,2.09493899 13.5691739,2.40993103 C12.6834946,1.02849867 11.1076296,0.165771883 9.39027909,0.165771883 C6.81133734,0.165771883 4.69032194,2.0883183 4.49533558,4.52142175 C1.99829318,4.62633422 0.000253558327,6.61330504 0.000253558327,9.04106101 C0.000253558327,11.5362971 2.10960528,13.5660477 4.70249274,13.5660477 L8.45895935,13.5660477 C8.77235745,13.5660477 9.02642289,13.3108966 9.02642289,12.9961592 C9.02642289,12.6816764 8.77235745,12.4265252 8.45895935,12.4265252 L4.70274629,12.4265252 C2.73564079,12.4265252 1.13543419,10.9078408 1.13543419,9.04131565 C1.13543419,7.17529973 2.73564079,5.65712467 4.70274629,5.65712467 C4.80645165,5.65712467 4.90888921,5.66247215 5.01031255,5.67011141 C5.17461834,5.68538992 5.33334585,5.62427586 5.45023624,5.509687 C5.56712663,5.39509814 5.62899486,5.23569231 5.62062744,5.07195756 C5.61733118,5.01135279 5.61580983,4.94998408 5.61580983,4.8881061 C5.61580983,2.91259416 7.30907234,1.30554907 9.39053265,1.30554907 C10.8948942,1.30554907 12.2542204,2.15325199 12.8541394,3.46516711 C12.9271642,3.62482759 13.069664,3.74196286 13.2400552,3.78219629 C13.4099393,3.82242971 13.5899657,3.78143236 13.7258729,3.67091777 C14.2078873,3.28055172 14.8220056,3.06563395 15.4551407,3.06563395 C16.9232434,3.06563395 18.1177567,4.19598939 18.1177567,5.58557029 C18.1177567,5.73402653 18.1030503,5.88401061 18.0749054,6.03144828 C18.0371252,6.22828647 18.1045717,6.43047215 18.2534104,6.56441379 C18.4019956,6.6981008 18.6096599,6.74342706 18.8003357,6.68409549 C19.0926885,6.59293369 19.3977191,6.54658886 19.7068067,6.54658886 C21.3564572,6.54658886 22.698795,7.86537931 22.698795,9.48617507 C22.698795,11.1072255 21.3564572,12.4262706 19.7068067,12.4262706 L14.7421347,12.4262706 C14.4289902,12.4262706 14.1749247,12.6814218 14.1749247,12.9959045 C14.1749247,13.3106419 14.4289902,13.5657931 14.7421347,13.5657931 L19.7070603,13.5657931 C21.9827463,13.5657931 23.8339756,11.7354271 23.8339756,9.48617507 C23.8339756,7.23692308 21.9824927,5.40681167 19.7070603,5.40681167 Z" id="Path"></path>
                                                                                                        <path d="M14.4507962,9.55620159 L12.2663912,6.36477454 C12.2615736,6.3578992 12.2549811,6.35306101 12.2501635,6.34618568 C12.2306395,6.32046684 12.2101012,6.29627586 12.1865203,6.27412202 C12.1743495,6.26266313 12.161418,6.2527321 12.148233,6.24254642 C12.1284555,6.22675862 12.1081708,6.21249867 12.0866183,6.19976658 C12.0716584,6.19085411 12.056952,6.18245093 12.0412314,6.17506631 C12.0184112,6.16411671 11.9943231,6.15545889 11.969728,6.14781963 C11.9537538,6.14272679 11.9387938,6.13687003 11.9228197,6.1330504 C11.8918855,6.12617507 11.8594301,6.12286472 11.8269746,6.12133687 C11.8173394,6.12082759 11.8082113,6.11777188 11.7985761,6.11777188 C11.7889409,6.11777188 11.7798128,6.12082759 11.7701775,6.12133687 C11.7374685,6.12311936 11.7052666,6.12617507 11.6743325,6.1330504 C11.6583583,6.13661538 11.6433984,6.14272679 11.6279313,6.14756499 C11.6030826,6.15520424 11.5789946,6.16386207 11.5559208,6.17506631 C11.5404537,6.18219629 11.5260009,6.19059947 11.5110409,6.19951194 C11.4892349,6.21249867 11.4686967,6.22675862 11.4486656,6.24280106 C11.4359877,6.25298674 11.4230562,6.26266313 11.411139,6.27412202 C11.387558,6.29627586 11.3665127,6.32097613 11.3472423,6.3469496 C11.3421711,6.35331565 11.3358321,6.35815385 11.3312681,6.36477454 L9.14610242,9.55620159 C8.96861159,9.8156817 9.03402964,10.1706525 9.29215202,10.3486472 C9.39053265,10.4166366 9.50235187,10.4489761 9.61315686,10.4489761 C9.79369039,10.4489761 9.97118122,10.3626525 10.0812255,10.2022281 L11.2313661,8.52235544 L11.2313661,19.1470345 C11.2313661,19.4617719 11.4854315,19.7169231 11.7988296,19.7169231 C12.1122277,19.7169231 12.3662932,19.4617719 12.3662932,19.1470345 L12.3662932,8.52286472 L13.5156731,10.2017188 C13.6931639,10.4611989 14.0463707,10.5268966 14.3047466,10.3489019 C14.562869,10.1703979 14.6280335,9.8156817 14.4507962,9.55620159 Z" id="Path"></path>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg></div><div class="rectangleText ">Drag & drop your files here </div><div class="secondary-cta">upload</div></div></div></div> '
									/>
									<div className='error-block'>{this.validator.message("enter 3 file", this.state.bankstate, "required|integer")}</div>

									<div className='indi-form-text '>
										<input type='password' className='form-control' name='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} id='password' autoComplete='off' required />
										<label for='password' className='form-label label-name'>
											<span className='content-name'>Enter statement password ( if applicable )</span>
										</label>
									</div>

									<div className='error-block'>{this.validator.message("password", this.state.name, "required|integer")}</div>
								</div>
							)}

							{this.state.conditionCheck === 3 && (
								<div className='third-form-eligibility'>
									<div className='indi-form-text '>
										<input type='text' className='form-control' name='firstname' value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} id='firstname' autoComplete='off' required />
										<label for='firstname' className='form-label label-name'>
											<span className='content-name'>First Name</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("first name", this.state.firstname, "required|alpha")}</div>
									<div className='indi-form-text '>
										<input type='text' className='form-control' name='lastname' value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} id='lastname' autoComplete='off' required />
										<label for='lastname' className='form-label label-name'>
											<span className='content-name'>Last Name</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("last name", this.state.lastname, "required|alpha")}</div>
									<div className='indi-form-text '>
										<InputMask type='text' className='form-control' id='dateOfBirth' name='dateOfBirth' mask='99/99/9999' value={this.state.dateOfBirth} onChange={e => this.setState({ dateOfBirth: e.target.value })} maskChar=' ' required />
										<label for='dateOfBirth' className='form-label label-name'>
											<span className='content-name'>Date of birth (DD/MM/YYYY)</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("dateOfBirth", this.state.dateOfBirth, "required")}</div>
									<div className=''>
										<label for='city' className=' label-name mb-0'>
											<span className='drop-down-name'>City</span>
										</label>
										<VirtualizedSelect placeholder='Select your City' options={options} onChange={city => this.setState({ city })} value={this.state.city} />
									</div>
									<div className='error-block'>{this.validator.message("city", this.state.city, "required")}</div>
									<div className='indi-form-text'>
										<input type='text' className='' name='panNumber' id='panNumber' maxlength='15' autoComplete='off' value={this.state.panNumber} onChange={e => this.setState({ panNumber: e.target.value })} required />
										<label for='panNumber' className=' label-name'>
											<span className='content-name'>PAN number</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("panNumber", this.state.panNumber, "required|alpha_num")}</div>
									<div className='indi-form-text'>
										<input type='text' className='' name='addressFirst' value={this.state.addressFirst} onChange={e => this.setState({ addressFirst: e.target.value })} id='addressFirst' autoComplete='off' required />
										<label for='addressFirst' className=' label-name'>
											<span className='content-name'>Address Line 1</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("addressFirst", this.state.addressFirst, "required")}</div>
									<div className='indi-form-text '>
										<input type='text' className='' name='addressSecond' id='addressSecond' value={this.state.addressSecond} onChange={e => this.setState({ addressSecond: e.target.value })} autoComplete='off' required />
										<label for='addressSecond' className=' label-name'>
											<span className='content-name'>Address Line 2</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("addressSecond", this.state.addressSecond, "required")}</div>
									<div className='indi-form-text '>
										<input type='tel' className='form-control' name='mobileno' id='mobileno' value={this.state.mobileno} onChange={e => this.setState({ mobileno: e.target.value })} id='landmark' autoComplete='off' required />
										<label for='mobileno' className='form-label label-name'>
											<span className='content-name'>10 digit mobile number</span>
										</label>
									</div>
									<div className='error-block'>{this.validator.message("mobile no", this.state.mobileno, "required|integer")}</div>
									<label>Gender</label>
									<div className='radio-area'>
										<div className='custom-radios'>
											<input
												type='radio'
												name='gender'
												value='male'
												onClick={() => {
													this.setState({ gender: 1 });
												}}
											/>
											<div className='custom-check'></div>
											<label>Male</label>
										</div>
										<div className='custom-radios'>
											<input
												type='radio'
												name='gender'
												value='female'
												onClick={() => {
													this.setState({ gender: 2 });
												}}
											/>
											<div className='custom-check'></div>
											<label>Female</label>
										</div>
										<div className='custom-radios'>
											<input
												type='radio'
												name='gender'
												value='other'
												onClick={() => {
													this.setState({ gender: 3 });
												}}
											/>
											<div className='custom-check'></div>
											<label>Other</label>
										</div>
									</div>
									<div className='error-block'>{this.validator.message("gender", this.state.gender, "required|integer")}</div>
									<div className='form-check'>
										<input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
										<label className='form-check-label text-14-semibold' for='defaultCheck1'>
											You hereby consent to sakalmoneyloans.com being appointed as your authorised representative to receive your Credit Information from Experian for the purpose of lead generation and financial advisory (“End Use Purpose”).
										</label>
									</div>
								</div>
							)}
							{this.state.conditionCheck === 4 && (
								<div className='fourth-otp-check'>
									<h3 className='text-14-bold mb-0'>Please enter the OTP that you received on your phone</h3>
									<OTPInput value={this.state.otp} className='otp-input' onChange={e => this.setState({ otp: e })} OTPLength={4} otpType='number' disabled={false} />
									<ResendOTP className='resend-otp' renderTime={this.renderTime} renderButton={this.renderButton} onResendClick={this.resendOtp} />
									<div className='error-block'>{this.validator.message("otp invalid", this.state.otp, "required")}</div>
								</div>
							)}

							{this.state.conditionCheck === 5 && (
								<div className='fifth-credit-section'>
									<div className='credit-score-display'>
										<div className=''>
											<ReactSpeedometer
												height={100}
												value={473}
												needleColor='black'
												//   startColor={this.state.color}
												segmentColors={[this.state.color, "#f2f2f8"]}
												needleHeightRatio={0.7}
												segments={2}
												ringWidth={50}
												forceRender={true}
												needleTransitionDuration={4000}
												needleTransition='easeElastic'
												//    endColor="gray"
											/>
										</div>
										<div className='score'>
											<p className='text-12-semibold'>Your Credit Score</p>
											<span className='score-value'>{this.state.score}</span>/<span className='by-score text-14-bold'>900</span>
										</div>
									</div>
									<div className='account-status justify-content-between '>
										<div className=''>
											<div className='count text-14-bold'>2</div>
											<div className='status-name text-14-bold'>Active Accounts</div>
										</div>
										<div className=''>
											<div className='count text-14-bold'>1</div>
											<div className='status-name text-14-bold'>Inactive Accounts</div>
										</div>
										<div className=''>
											<div className='count text-14-bold'>3</div>
											<div className='status-name text-14-bold'>Total Accounts</div>
										</div>
									</div>
									<p className='text-12-semibold'>While we asses your eligibility, you can proceed with your loan application and document submission.</p>
								</div>
							)}
							{this.state.conditionCheck === 6 && <div></div>}
							<footer className='container-fluid'>
								<div className='row justify-content-between align-items-center'>
									<button className={this.state.conditionCheck < 3 ? "secondary-cta" : "secondary-cta-hidden"} onClick={this.back}>
										{" "}
										back{" "}
									</button>
									{this.state.conditionCheck != 1 && (
										<button className='primary-button' onClick={this.next}>
											{" "}
											Next{" "}
										</button>
									)}
									{this.state.conditionCheck === 1 && this.state.bankStatement === false && (
										<button className='disabled-button' disabled onClick={this.next}>
											{" "}
											Next{" "}
										</button>
									)}
									{this.state.conditionCheck === 1 && this.state.bankStatement === true && (
										<button className='primary-button' onClick={this.next}>
											{" "}
											Next{" "}
										</button>
									)}
									{/* {this.state.bankStatement===true ?  <button className="primary-button" onClick={this.next}> Next </button> : <button className="primary-button gray" onClick={this.next}> next </button> } */}
								</div>
							</footer>
						</form>
						<ContinueLaterModal />
					</div>
				</div>
			</div>
		);
	}
}

export default EigibiltyCheck;
