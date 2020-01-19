import React, { Component } from "react";
import Nav from "../nav/leftNav";
import TopNav from "./topNav";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import InputMask from "react-input-mask";
import VirtualizedSelect from "react-virtualized-select";
import { companyProfileUpdate } from "../../services/companyProfileUpdate";


class workDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			organizationName: "",
			employerType: "",
			designation: "",
			bankName: "",
			workExperiance: "",
			workExperianceCompany: "",
			selectCity: "",
			selectState: "",
			postalCode: "",
			officeOwnershipStatus: "",
			joiningDate: "",
			netSalary: "",
			businessName: "",
			annualTurnOver: "",
			income: "",
			currentEMI: "",
			officeOwnership: "",
			joiningDate: "",
			workingSince: '',

			companyName: '',
			companyType: '',
			industry: '',
			incorporationDate: '',
			turnover12months: '',
			revenue: '',
			profit: '',
			addressLine1: '',
			addressLine2: '',
			Landmark: '',
			pinCode: '',
			workExperienceMonths: '',

			// loanType: props.match.params.loanType || "unknown",
			employmentType: "Salaried",
			loanType: "Personal Loan Application"
		};
		
		this.validator = new SimpleReactValidator();
	}

	inputHandler = e => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	next = e => {
		e.preventDefault();

		if (this.validator.allValid()) {
			// window.location.href='bank-details'
			let dataString = {
				access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
				companyName: this.state.organizationName,
				employerType: this.state.employerType,
				positionInCompany: this.state.designation,
				city: this.state.cityValue,
				state: this.state.stateValue,
				zipCode: this.state.postalCode,
			  }
		
			  let companyProfileUpdateData = companyProfileUpdate(dataString);
			  console.log(companyProfileUpdateData)
		}else 
		this.validator.showMessages();
		this.forceUpdate();
	};

	officeOwnership = e => {
		e.preventDefault();
		this.setState({ officeOwnership: e.target.innerHTML });
		// console.log(e.target.innerHTML)
	};

	employerType = e => {
		e.preventDefault();
		this.setState({ employerType: e.target.innerHTML });
		// console.log(e.target.innerHTML)
	};

	workExperiance = e => {
		e.preventDefault();
		this.setState({ workExperiance: e.target.innerHTML });
		// console.log(e.target.innerHTML)
	};

	companyType = e => {
		e.preventDefault();
		this.setState({ companyType: e.target.innerHTML });
	}

	turnover12months =e => {
		e.preventDefault();
		this.setState({ turnover12months: e.target.innerHTML });
	}
	pinCode = e => {
		e.preventDefault();
		this.setState({ pinCode: e.target.innerHTML });
	}

	render() {
		$(document).on("click", ".dropdown-menu .dropdown-item", function() {
			let value = $(this).text();
			$(this)
				.parent(".dropdown-menu")
				.siblings(".dropdown-button")
				.text(value);
		});

		const options = [
			{ label: "Mumbai", value: 1 },
			{ label: "Navi Mumbai", value: 2 },
			{ label: "Three", value: 3 }
			// And so on...
		];
		const StateOptions = [
			{ label: "Maharashtra", value: 1 },
			{ label: "Gujrat", value: 2 },
			{ label: "Three", value: 3 }
			// And so on...
		];
		return (
			<div className='workDetails'>
				<div className='container-fluid '>
					<div className='row'>
						<div className='col-xl-3 p-0'>
							<Nav active={3} />
						</div>
						<div className='col-xl-9 rightSec'>
							<TopNav />
							{/* Form Section */}
							<div className='container-fluid form-section'>
								<div className='row'>
									<div className='col-xl-12 formHeader'>
										<div className='row  align-items-center justify-content-between'>
											<div className='col-xl-3 text-16-bold'>Work Details</div>

											<div className='col-xl-3 text-12-semibold'>All fields are mandatory</div>
										</div>
									</div>
								</div>
								<div className='formPart'>
							
{/* PERSONAL LOAN & SALARIED */}
{this.state.employmentType === "Salaried" && this.state.loanType === "Personal Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='organizationName' id='organizationName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='organizationName' className='form-label label-name'>
															<span className='content-name'>Organization Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Organization name", this.state.organizationName, "required|alpha_space")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Employer type</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select employer type
															</button>
															<div className='dropdown-menu' onClick={this.employerType} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Government</a>
																<a className='dropdown-item text-14-semibold'>Public Sector Undertakings</a>
																<a className='dropdown-item text-14-semibold'>Public Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Private Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Multinational Company</a>
																<a className='dropdown-item text-14-semibold'>Propietorship</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.employerType, "required|alpha_space")}</div>
												</div>
											</div>

											<div className='row rowPadding'>
											<div className='col-xl-6'>
													
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Office ownership</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select office ownership status
															</button>
															<div className='dropdown-menu' onClick={this.officeOwnership} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Owned</a>
																<a className='dropdown-item text-14-semibold'>Rented</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.officeOwnership, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='designation' id='designation' onChange={this.inputHandler} autoComplete='off' required />
														<label for='designation' className='form-label label-name'>
															<span className='content-name'>Designation</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Designation", this.state.designation, "required|alpha_space")}</div>
												</div>


											</div>

											<div className='row rowPadding'>
												
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Total work experience</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select your work experience
															</button>
															<div className='dropdown-menu' onClick={this.workExperiance} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>0-2 years</a>
																<a className='dropdown-item text-14-semibold'>2-5 years</a>
																<a className='dropdown-item text-14-semibold'>5-10 years</a>
																<a className='dropdown-item text-14-semibold'>10-15 years</a>
																<a className='dropdown-item text-14-semibold'>15+ years</a>
															
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.workExperiance, "required")}</div>
												</div>

												<div className="col-xl-6">
													<div className='indi-form-text '>
														<InputMask type='text' className='form-control' id='workingSince' name='dateOfBirth' mask="99/99/9999" value={this.state.workingSince} onChange={e => this.setState({ workingSince: e.target.value })} maskChar=" " required />

													
														<label for='workingSince' className='form-label label-name'>
															<span className='content-name'>Working since in current employment (DD/MM/YYYY)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Working since in current employment", this.state.workingSince, "required")}</div>
												</div>

											</div>

											<div className='row rowPadding'>
												
												<div className='col-xl-6'>
													<label for='state' className=' label-name mb-0'>
														<span className='drop-down-name'>State</span>
													</label>
													<VirtualizedSelect placeholder='Select State' options={StateOptions} onChange={stateValue => this.setState({ stateValue })} value={this.state.stateValue} />
													
													<div className='error-block'>{this.validator.message("Select State", this.state.stateValue, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<label for='city' className=' label-name mb-0'>
														<span className='drop-down-name'>City</span>
													</label>
													<VirtualizedSelect placeholder='Select City' options={options} onChange={cityValue => this.setState({ cityValue })} value={this.state.cityValue} />
												
													<div className='error-block'>{this.validator.message("Select City", this.state.cityValue, "required")}</div>
												</div>
											</div>

											<div className='row rowPadding'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='postalCode' id='postalCode' onChange={this.inputHandler} autoComplete='off' required />
														<label for='postalCode' className='form-label label-name'>
															<span className='content-name'>PIN code</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.postalCode, "required|integer")}</div>
												</div>

												{/* Field Removed in as per updated zeplin 11-12-19 */}
												
												{/* <div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='bankName' id='bankName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='bankName' className='form-label label-name'>
															<span className='content-name'>Salary Account Bank name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Salary Account Bank name", this.state.bankName, "required|integer")}</div>
												</div> */}


											</div>
										</div>
									)}

{/* HOME LOAN & SALARIED */}
{this.state.employmentType === "Salaried" && this.state.loanType === "Home Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='organizationName' id='organizationName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='organizationName' className='form-label label-name'>
															<span className='content-name'>Organization Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Organization name", this.state.organizationName, "required|alpha_space")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<InputMask type='text' className='form-control' id='joiningDate' name='joiningDate' mask='99/99/9999' value={this.state.joiningDate} onChange={e => this.setState({ joiningDate: e.target.value })} maskChar=' ' required />
														{/* <input type='text' className='form-control' name='employerType' id='employerType' onChange={this.inputHandler} autoComplete='off' required /> */}
														<label for='joiningDate' className='form-label label-name'>
															<span className='content-name'>Joining Date (DD/MM/YYYY)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Joining Date", this.state.joiningDate, "required")}</div>
												</div>
											</div>

											<div className='row rowPadding'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='workExperiance' id='workExperiance' onChange={this.inputHandler} autoComplete='off' required />
														<label for='workExperiance' className='form-label label-name'>
															<span className='content-name'>Total work experience (in months)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Total work experiance", this.state.workExperiance, "required|integer")}</div>
												</div>
												{/* <div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='netSalary' id='netSalary' onChange={this.inputHandler} autoComplete='off' required />
														<label for='netSalary' className='form-label label-name'>
															<span className='content-name'>Net Salary</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("NetSalary", this.state.netSalary, "required|integer")}</div>
												</div> */}
											</div>
										</div>
									)}
{/* HOME LOAN & SELF EMPLOYED */}
{this.state.employmentType === "Self Employed" && this.state.loanType === "Home Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='businessName' id='businessName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='businessName' className='form-label label-name'>
															<span className='content-name'>Business Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Business name", this.state.businessName, "required|alpha_space")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='annualTurnOver' id='annualTurnOver' onChange={this.inputHandler} autoComplete='off' required />
														<label for='annualTurnOver' className='form-label label-name'>
															<span className='content-name'>Annual turn over</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Annual turn over", this.state.annualTurnOver, "required|integer")}</div>
												</div>

												{/* Field Deleted as per latest zeplin updaate 12-12-19 */}
												{/* <div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='text' className='form-control' name='income' id='income' onChange={this.inputHandler} autoComplete='off' required />
														<label for='income' className='form-label label-name'>
															<span className='content-name'>Income (per month)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Income", this.state.income, "required")}</div>
												</div> */}
											</div>

											{/* <div className='row rowPadding'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='annualTurnOver' id='annualTurnOver' onChange={this.inputHandler} autoComplete='off' required />
														<label for='annualTurnOver' className='form-label label-name'>
															<span className='content-name'>Annual turn over</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Annual turn over", this.state.annualTurnOver, "required|integer")}</div>
												</div> */}
												{/* <div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='currentEMI' id='currentEMI' onChange={this.inputHandler} autoComplete='off' required />
														<label for='currentEMI' className='form-label label-name'>
															<span className='content-name'>Total current EMI</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Total current EMI", this.state.currentEMI, "required|integer")}</div>
												</div> */}
											{/* </div> */}
										</div>
									)}

{/* BUSINESS LOAN & SELF EMPLOYED */}
{this.state.employmentType === "Self Employed" && this.state.loanType === "Business Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='companyName' id='companyName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='companyName' className='form-label label-name'>
															<span className='content-name'>Company Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Organization name", this.state.companyName, "required|alpha_space")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Company Type</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select company type
															</button>
															<div className='dropdown-menu' onClick={this.companyType} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Government</a>
																<a className='dropdown-item text-14-semibold'>Public Sector Undertakings</a>
																<a className='dropdown-item text-14-semibold'>Public Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Private Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Multinational Company</a>
																<a className='dropdown-item text-14-semibold'>Propietorship</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.companyType, "required|alpha_space")}</div>
												</div>
											</div>

											<div className='row rowPaddingForBusiness'>
											<div className='col-xl-6'>
													
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Industry</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select industry
															</button>
															<div className='dropdown-menu' onClick={this.industry} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Manufacturing</a>
																<a className='dropdown-item text-14-semibold'>Trading</a>
																<a className='dropdown-item text-14-semibold'>Retail Services</a>
																<a className='dropdown-item text-14-semibold'>IT</a>
																<a className='dropdown-item text-14-semibold'>etc</a>
																
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.industry, "required")}</div>
												</div>

												<div className="col-xl-6">
													<div className='indi-form-text '>
														<InputMask type='text' className='form-control' id='incorporationDate' name='incorporationDate' mask="99/99/9999" value={this.state.incorporationDate} onChange={e => this.setState({ incorporationDate: e.target.value })} maskChar=" " required />

													
														<label for='workingSince' className='form-label label-name'>
															<span className='content-name'>Incorporatioin date (DD/MM/YYYY)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("dateOfBirth", this.state.incorporationDate, "required")}</div>
												</div>


											</div>

											<div className='row rowPaddingForBusiness'>
												
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Last 12 months turnover</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select your turnover amount
															</button>
															<div className='dropdown-menu' onClick={this.turnover12months} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>0-6 Lacs</a>
																<a className='dropdown-item text-14-semibold'>6-15 Lacs</a>
																<a className='dropdown-item text-14-semibold'>15-25 Lacs</a>
																<a className='dropdown-item text-14-semibold'>25-50 Lacs</a>
																<a className='dropdown-item text-14-semibold'>50Lacs - 1Cr. </a>
																<a className='dropdown-item text-14-semibold'>1-10 Cr.</a>
																<a className='dropdown-item text-14-semibold'>More than 10 Cr.</a>
															
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.turnover12months, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='revenue' id='revenue' onChange={this.inputHandler} autoComplete='off' required />
														<label for='revenue' className='form-label label-name'>
															<span className='content-name'>Revenue</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Revenue", this.state.revenue, "required|alpha_space")}</div>
												</div>
											</div>
											<div className='row rowPaddingForBusiness'>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='profit' id='profit' onChange={this.inputHandler} autoComplete='off' required />
														<label for='revenue' className='form-label label-name'>
															<span className='content-name'>Profit</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Profit", this.state.profit, "required|alpha_space")}</div>
												</div>
											</div>
											{/* Company Address */}
											<div className=' rowPadding companyAdd ' >
												<div>Company Address</div>
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='addressLine1' id='addressLine1' onChange={this.inputHandler} autoComplete='off' required />
														<label for='companyName' className='form-label label-name'>
															<span className='content-name'>Company's address line 1</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Company's address line 1", this.state.addressLine1, "required|alpha_space")}</div>
											</div>
											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='addressLine2' id='addressLine2' onChange={this.inputHandler} autoComplete='off' required />
														<label for='addressLine2' className='form-label label-name'>
															<span className='content-name'>Company's address line 2</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Company's address line 2", this.state.addressLine2, "required|alpha_space")}</div>
											</div>
												
												
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='Landmark' id='Landmark' onChange={this.inputHandler} autoComplete='off' required />
														<label for='Landmark' className='form-label label-name'>
															<span className='content-name'>Landmark</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Landmark", this.state.Landmark, "required|alpha_space")}</div>
											</div>

												<div className='col-xl-6'>
													<label for='state' className=' label-name mb-0'>
														<span className='drop-down-name'>State</span>
													</label>
													<VirtualizedSelect placeholder='Select State' options={StateOptions} onChange={stateValue => this.setState({ stateValue })} value={this.state.stateValue} />
													
													<div className='error-block'>{this.validator.message("Select City", this.state.stateValue, "required")}</div>
												</div>

										
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<label for='city' className=' label-name mb-0'>
														<span className='drop-down-name'>City</span>
													</label>
													<VirtualizedSelect placeholder='Select City' options={options} onChange={cityValue => this.setState({ cityValue })} value={this.state.cityValue} />
												
													<div className='error-block'>{this.validator.message("Select City", this.state.cityValue, "required")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='postalCode' id='postalCode' onChange={this.inputHandler} autoComplete='off' required />
														<label for='postalCode' className='form-label label-name'>
															<span className='content-name'>PIN code</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("PIN code", this.state.pinCode, "required|integer")}</div>
												</div>
												

											</div>
										</div>
									)}
{/* CAR LOAN & SELF EMPLOYED */}
{this.state.employmentType === "Self Employed" && this.state.loanType === "Car Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='companyName' id='companyName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='companyName' className='form-label label-name'>
															<span className='content-name'>Company Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Organization name", this.state.companyName, "required|alpha_space")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Company Type</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select company type
															</button>
															<div className='dropdown-menu' onClick={this.companyType} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Government</a>
																<a className='dropdown-item text-14-semibold'>Public Sector Undertakings</a>
																<a className='dropdown-item text-14-semibold'>Public Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Private Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Multinational Company</a>
																<a className='dropdown-item text-14-semibold'>Propietorship</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.companyType, "required|alpha_space")}</div>
												</div>
											</div>

											<div className='row rowPaddingForBusiness'>
											<div className='col-xl-6'>
													
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Industry</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select industry
															</button>
															<div className='dropdown-menu' onClick={this.industry} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Manufacturing</a>
																<a className='dropdown-item text-14-semibold'>Trading</a>
																<a className='dropdown-item text-14-semibold'>Retail Services</a>
																<a className='dropdown-item text-14-semibold'>IT</a>
																<a className='dropdown-item text-14-semibold'>etc</a>
																
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.industry, "required")}</div>
												</div>

												<div className="col-xl-6">
													<div className='indi-form-text '>
														<InputMask type='text' className='form-control' id='incorporationDate' name='incorporationDate' mask="99/99/9999" value={this.state.incorporationDate} onChange={e => this.setState({ incorporationDate: e.target.value })} maskChar=" " required />

													
														<label for='workingSince' className='form-label label-name'>
															<span className='content-name'>Incorporatioin date (DD/MM/YYYY)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("dateOfBirth", this.state.incorporationDate, "required")}</div>
												</div>


											</div>

											<div className='row rowPaddingForBusiness'>
												
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Last 12 months turnover</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select your turnover amount
															</button>
															<div className='dropdown-menu' onClick={this.turnover12months} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>0-6 Lacs</a>
																<a className='dropdown-item text-14-semibold'>6-15 Lacs</a>
																<a className='dropdown-item text-14-semibold'>15-25 Lacs</a>
																<a className='dropdown-item text-14-semibold'>25-50 Lacs</a>
																<a className='dropdown-item text-14-semibold'>50Lacs - 1Cr. </a>
																<a className='dropdown-item text-14-semibold'>1-10 Cr.</a>
																<a className='dropdown-item text-14-semibold'>More than 10 Cr.</a>
															
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.turnover12months, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='revenue' id='revenue' onChange={this.inputHandler} autoComplete='off' required />
														<label for='revenue' className='form-label label-name'>
															<span className='content-name'>Revenue</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Revenue", this.state.revenue, "required|alpha_space")}</div>
												</div>
											</div>
											<div className='row rowPaddingForBusiness'>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='profit' id='profit' onChange={this.inputHandler} autoComplete='off' required />
														<label for='revenue' className='form-label label-name'>
															<span className='content-name'>Profit</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Profit", this.state.profit, "required|alpha_space")}</div>
												</div>
											</div>
											{/* Company Address */}
											<div className=' rowPadding companyAdd ' >
												<div>Company Address</div>
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='addressLine1' id='addressLine1' onChange={this.inputHandler} autoComplete='off' required />
														<label for='companyName' className='form-label label-name'>
															<span className='content-name'>Company's address line 1</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Company's address line 1", this.state.addressLine1, "required|alpha_space")}</div>
											</div>
											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='addressLine2' id='addressLine2' onChange={this.inputHandler} autoComplete='off' required />
														<label for='addressLine2' className='form-label label-name'>
															<span className='content-name'>Company's address line 2</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Company's address line 2", this.state.addressLine2, "required|alpha_space")}</div>
											</div>
												
												
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='Landmark' id='Landmark' onChange={this.inputHandler} autoComplete='off' required />
														<label for='Landmark' className='form-label label-name'>
															<span className='content-name'>Landmark</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Landmark", this.state.Landmark, "required|alpha_space")}</div>
											</div>

												<div className='col-xl-6'>
													<label for='state' className=' label-name mb-0'>
														<span className='drop-down-name'>State</span>
													</label>
													<VirtualizedSelect placeholder='Select State' options={StateOptions} onChange={stateValue => this.setState({ stateValue })} value={this.state.stateValue} />
													
													<div className='error-block'>{this.validator.message("Select City", this.state.stateValue, "required")}</div>
												</div>

										
											</div>

											<div className='row rowPaddingForBusiness'>

											<div className='col-xl-6'>
													<label for='city' className=' label-name mb-0'>
														<span className='drop-down-name'>City</span>
													</label>
													<VirtualizedSelect placeholder='Select City' options={options} onChange={cityValue => this.setState({ cityValue })} value={this.state.cityValue} />
												
													<div className='error-block'>{this.validator.message("Select City", this.state.cityValue, "required")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='postalCode' id='postalCode' onChange={this.inputHandler} autoComplete='off' required />
														<label for='postalCode' className='form-label label-name'>
															<span className='content-name'>PIN code</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("PIN code", this.state.pinCode, "required|integer")}</div>
												</div>
												

											</div>
										</div>
									)}
{/* CAR LOAN & SALARIED */}
{this.state.employmentType === "Salaried" && this.state.loanType === "Car Loan Application" && (
										<div>
											<div className='row orgName'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='organizationName' id='organizationName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='organizationName' className='form-label label-name'>
															<span className='content-name'>Organization Name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Organization name", this.state.organizationName, "required|alpha_space")}</div>
												</div>
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Employer type</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select employer type
															</button>
															<div className='dropdown-menu' onClick={this.employerType} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Government</a>
																<a className='dropdown-item text-14-semibold'>Public Sector Undertakings</a>
																<a className='dropdown-item text-14-semibold'>Public Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Private Listed Company</a>
																<a className='dropdown-item text-14-semibold'>Multinational Company</a>
																<a className='dropdown-item text-14-semibold'>Propietorship</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.employerType, "required|alpha_space")}</div>
												</div>
											</div>

											<div className='row rowPadding'>
											<div className='col-xl-6'>
													
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Office ownership</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select office ownership status
															</button>
															<div className='dropdown-menu' onClick={this.officeOwnership} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>Owned</a>
																<a className='dropdown-item text-14-semibold'>Rented</a>
																<a className='dropdown-item text-14-semibold'>Others</a>
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.officeOwnership, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='designation' id='designation' onChange={this.inputHandler} autoComplete='off' required />
														<label for='designation' className='form-label label-name'>
															<span className='content-name'>Designation</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Designation", this.state.designation, "required|alpha_space")}</div>
												</div>


											</div>

											<div className='row rowPadding'>
												
												<div className='col-xl-6'>
													<div className='drop-down-section'>
														<label for='name' className='label-name '>
															<span className='drop-down-name '>Total work experience</span>
														</label>
														<div className='dropdown'>
															<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
																Select your work experience
															</button>
															<div className='dropdown-menu' onClick={this.workExperiance} aria-labelledby='dropdownMenuButton'>
																<a className='dropdown-item text-14-semibold'>0-2 years</a>
																<a className='dropdown-item text-14-semibold'>2-5 years</a>
																<a className='dropdown-item text-14-semibold'>5-10 years</a>
																<a className='dropdown-item text-14-semibold'>10-15 years</a>
																<a className='dropdown-item text-14-semibold'>15+ years</a>
															
															</div>
														</div>
													</div>
													<div className='error-block'>{this.validator.message("Employer Type", this.state.workExperiance, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='workExperienceMonths' id='workExperienceMonths' onChange={this.inputHandler} autoComplete='off' required />
														<label for='designation' className='form-label label-name'>
															<span className='content-name'>Work experience in 'company' (in months)</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Work experience", this.state.workExperienceMonths, "required|integer")}</div>
												</div>

											</div>

											<div className='row rowPadding'>
												
												<div className='col-xl-6'>
													<label for='state' className=' label-name mb-0'>
														<span className='drop-down-name'>State</span>
													</label>
													<VirtualizedSelect placeholder='Select State' options={StateOptions} onChange={stateValue => this.setState({ stateValue })} value={this.state.stateValue} />
													
													<div className='error-block'>{this.validator.message("Select State", this.state.stateValue, "required")}</div>
												</div>

												<div className='col-xl-6'>
													<label for='city' className=' label-name mb-0'>
														<span className='drop-down-name'>City</span>
													</label>
													<VirtualizedSelect placeholder='Select City' options={options} onChange={cityValue => this.setState({ cityValue })} value={this.state.cityValue} />
												
													<div className='error-block'>{this.validator.message("Select City", this.state.cityValue, "required")}</div>
												</div>
											</div>

											<div className='row rowPadding'>
												<div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='postalCode' id='postalCode' onChange={this.inputHandler} autoComplete='off' required />
														<label for='postalCode' className='form-label label-name'>
															<span className='content-name'>PIN code</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Postal code", this.state.postalCode, "required|integer")}</div>
												</div>

												{/* Deleted in updated zeplin as per 12-12-19 */}
												
												{/* <div className='col-xl-6'>
													<div className='indi-form-text '>
														<input type='tel' className='form-control' name='bankName' id='bankName' onChange={this.inputHandler} autoComplete='off' required />
														<label for='bankName' className='form-label label-name'>
															<span className='content-name'>Salary Account Bank name</span>
														</label>
													</div>
													<div className='error-block'>{this.validator.message("Salary Account Bank name", this.state.bankName, "required|integer")}</div>
												</div> */}


											</div>
										</div>
									)}
								</div>

								<footer className='row justify-content-between'>
									<button className='secondary-cta' onClick={()=>window.location.href='loan-detail'}>back</button>

									<button className='primary-button' onClick={this.next}>
										next
									</button>
								</footer>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default workDetails;
