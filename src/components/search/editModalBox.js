import React, { Component } from "react";

class EditModalBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			age: this.props.profileData.borrowerDetail.borrowerProfileTextVariable6,
			city:this.props.profileData.loanApplications[0].loanDetails.city,
			monthlyIncomne: this.props.profileData.borrowerDetail.grossIncome,
			loanAmount: this.props.profileData.loanApplications[0].loanDetails.loanAmount,
			existingLoan: this.props.profileData.borrowerDetail.monthlyEmiOnOutstandingLoans === "Rs0" ? false : true,
			employmentType: this.props.profileData.borrowerDetail.monthlyEmiOnOutstandingLoans === "Rs0" ? false : true
		};
	}

	render() {
		const { age, city, monthlyIncomne, loanAmount, employmentType, existingLoan } = this.state;
		return (
			<div>
				{/* Edit personal  modal box  start */}

				<div class='modal  bd-example-modal-lg edit-personal-info-search fade' id='edit-personal-info-search' tabindex='-1' role='dialog' aria-hidden='true'>
					<div class='modal-dialog-centered modal-dialog modal-lg'>
						<div class='modal-content'>
							<div className='modal-body'>
								<h5>Edit personal information</h5>
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
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-md-8 pl-0'>
											<div className='row'>
												<div className='col-md-6'>
													<div className='indi-form-text'>
														<input type='text' className='' name='name' id='name' autoComplete='off' value={age} required />
														<label htmlFor='name' className=' label-name'>
															<span className='content-name'>Age</span>
														</label>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='indi-form-text'>
														<input type='text' className='' name='name' id='name' autoComplete='off' value={city} required />
														<label htmlFor='name' className=' label-name'>
															<span className='content-name'>Select your city</span>
														</label>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='indi-form-text'>
														<input type='text' className='' name='name' id='name' autoComplete='off' required value={monthlyIncomne} />
														<label htmlFor='name' className=' label-name'>
															<span className='content-name'>Monthly income</span>
														</label>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='indi-form-text'>
														<input type='text' className='' name='name' id='name' autoComplete='off' required value={loanAmount} />
														<label htmlFor='name' className=' label-name'>
															<span className='content-name'>Loan amount</span>
														</label>
													</div>
												</div>
												<div className='col-md-12'>
													<div className='radio-area'>
														<div className='label'>Choose employment type</div>
														<div className='custom-radios ' onClick={() => this.setState({ employmentType: true })}>
															<label>
																<input type='radio' name='radio1' />
																<div className='custom-check'></div>
																Salaried
															</label>
														</div>
														<div className='custom-radios' onClick={() => this.setState({ employmentType: false })}>
															<label>
																<input type='radio' name='radio1' />
																<div className='custom-check'></div>
																Self Employed
															</label>
														</div>
													</div>
												</div>
												<div className='col-md-12'>
													<div className='radio-area'>
														<div className='label'>Existing Loan</div>
														<div className='custom-radios ' onClick={() => this.setState({ existingLoan: true })}>
															<label>
																<input type='radio' name='radio1' />
																<div className='custom-check'></div>
																Yes
															</label>
														</div>
														<div className='custom-radios' onClick={() => this.setState({ existingLoan: false })}>
															<label>
																<input type='radio' name='radio1' />
																<div className='custom-check'></div>
																No
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='col-md-4'></div>
										<div className='col-md-12'>
											<button className='edit-personal-profile'>done</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Edit personal  modal box end */}
			</div>
		);
	}
}

export default EditModalBox;
