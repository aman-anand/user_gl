import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import HomeIllustration from "../../images/home-loan.svg";
class Faq extends Component {
	constructor(props) {
		super(props);
		this.state={
			pagination: 1,
			loanType: 'Home Loan'
		}
	}
	
	pagination= (e) => {
		e.preventDefault();
		this.setState({pagination: e.target.innerHTML})
		// console.log(e.target.innerHTML)
	}

	loanType = (e) => {
		e.preventDefault();
		this.setState({loanType: e.target.innerHTML})
		// console.log(e.target.innerHTML)
	}
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-2 pl-0'>
						<Navigation nav={4} />
					</div>
					<div className='col-xl-10 faq'>
						<h1>Frequently asked questions</h1>
						<ul className='nav nav-tabs' role='tablist'>
							<li className='nav-item' onClick={this.loanType}>
								<a className='nav-link active' data-toggle='tab' href='#home-loan-tab-faq' role='tab' aria-selected='true'>
								Home Loan
								</a>
							</li>
							<li className='nav-item' onClick={this.loanType}>
								<a className='nav-link' data-toggle='tab' href='#personal-loan-tab-faq' role='tab' aria-selected='false'>
									Personal Loan
								</a>
							</li>
							<li className='nav-item' onClick={this.loanType}>
								<a className='nav-link' data-toggle='tab' href='#car-loan-tab-faq' role='tab' aria-selected='false'>
									Car Loan 
								</a>
							</li>
							<li className='nav-item' onClick={this.loanType}>
								<a className='nav-link' data-toggle='tab' href='#bussiness-loan-tab-faq' role='tab' aria-selected='false'>
								Business Loan
								</a>
							</li>
						</ul>
						<div className='tab-content m-0'>
							<div className='tab-pane fade show active' id='home-loan-tab-faq' role='tabpanel'>
								<div className='heading-faq container-fluid'>
									<div className='row  align-items-end'>
{/* Accordion Home Loan Start */}
	{this.state.loanType ==='Home Loan' &&
								<div className='heading-faq container'>
									<div className='row  align-items-center justify-content-center'>
										
{/* Accordian start 1 HOME LOAN */}
		{this.state.pagination==1 &&
								<div class='col-lg-7 p-0 scrollableDivv' id="faq1">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingOne">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
																1. Which factors determine my home loan eligibility?
																</div>
															</h4>

														</div>
														<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Banks/financial institutions consider the following factors when determining your loan eligibility:</div>
																	<li>Age</li>
																	<li>Annual Income</li>
																	<li>Occupational stability</li>
																	<li>Resident type [Indian Citizen, Non-Resident Indian (NRI), Person of Indian Origin (PIO)]</li>
																	<li>Number of co-applicants</li>
																	<li>Co-applicants' income</li>
																	<li>Credit score</li>
																	<li>Other ongoing loans, if any</li>
					
																
															
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingTwo">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																2. What are the key parameters to consider while looking for a home loan?
																</div>
															</h4>

														</div>
														<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Purpose of the loan</li>
																	<li>Whether the house you are considering to purchase is ready for possession or will you be buying a plot and constructing later</li>
																	<li>Loan eligibility amount</li>
																	<li>Interest rate and EMI</li>
																	<li>Processing fee</li>
																	<li>Pre-closure fees and pre-payment fees applicable</li>
					
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingThree">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																3. How can I compare loans from different providers?

																</div>
															</h4>

														</div>
														<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>All you have to do is complete the eligibility form and you will get access to customized quotes from a number of loan providers. </li>
																	<li>You can browse, compare interest rates, EMIs, repayment charges and processing fee and make an informed decision and avail the best deal.</li>															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFour">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																4. What are the tenure options for home loan?

																</div>
															</h4>

														</div>
														<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>A home loan can be taken for any time period between 5 and 30 years. The tenure varies as per the lender and eligibility of the customer. </li>
																	<li>It is important to remember however that your eligibility ends after the age of 65, or when you retire - whichever comes first. So the tenure must end before either of these.</li>
																
															</div>
														</div>
													</div>
													
												
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFive">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
																5. Can loan be applied with co-applicant?

																</div>
															</h4>

														</div>
														<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you can apply for a loan with a co-applicant. All you have to do is specify it in the application form. Having a co-applicant increases your chances of availing an increased loan amount. This depends on the co-applicant's profile, income and obligations.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading6">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapseFour">
																6.  What is the difference between a fixed rate and floating rate home loan?

																</div>
															</h4>

														</div>
														<div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading6">
															<div class="panel-body text-14-semibold grey dot">
																
																	<div>The rate of interest associated with fixed rate loans remain unchanged during the entire tenure of the loan. On the other hand, the interest rates applicable on floating rate loans can be revised from time to time depending on the RBI key policy rates. The equated monthly instalments can increase or decrease depending on the prevailing RBI rates in the case floating rate type loans.</div>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading7">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapseFour">
																7. Can I prepay my outstanding home loan amount?

																</div>
															</h4>

														</div>
														<div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading7">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you can choose to prepay your outstanding loan amount either partially or in full before the completion of your loan tenure. While banks do not charge any prepayment fee on floating rate loans, fixed rate home loans attract a penalty up to 2% of the loan amount if prepaid through refinance.</li>
																	<li>Under Section 24 of the IT Act, taxpayers are also eligible for benefits up to Rs.2 lakh on the interest repaid against a home loan annually.</li>																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading8">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse8" aria-expanded="false" aria-controls="collapseFour">
																8. Who can be a co-applicant?

																</div>
															</h4>

														</div>
														<div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>The co-applicant can be an immediate family member such as your spouse, your parents or even your major children. It is also mandatory for all co-owners of the property to be co-applicants while applying for a loan. However, the co-applicant need not be a co-owner.</li>
																
															</div>
														</div>
													</div>
												</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading10">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse10" aria-expanded="false" aria-controls="collapseFour">
																10. What is Pre-EMI?

																</div>
															</h4>

														</div>
														<div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading10">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Pre-EMI is defined as the interest that is to be paid to the loan provider until the entire loan amount is disbursed. The Pre-EMI is payable on a monthly basis until the last disbursement, post which the regular EMI will be applicable comprising the principal and interest components.</li>
																
															</div>
														</div>
													</div>
												
											</div>
										</div>
									</div>
								</div>
								}
								{/* Accordion end 1 */}

								 {/* Accordian start 2 */}
		{this.state.pagination==2 &&
								 <div class='col-lg-7 p-0 scrollableDivv' id="faq2">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading11">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse11" aria-expanded="false" aria-controls="collapseFour">
																11. How large a loan can I avail of?


																</div>
															</h4>

														</div>
														<div id="collapse11" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading11">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Banks or financial institutions can lend up to 75-80% of the cost of the property. You are expected to pay 20-25% of the amount as a down payment for the loan.</li>
																	<li>For self-employed individuals, your business' profit is the yardstick to determine the amount of loan you can avail.</li>
																
															</div>
														</div>
													</div>
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading12">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse12" aria-expanded="false" aria-controls="collapse12">
																12. What is processing fees?
																</div>
															</h4>

														</div>
														<div id="collapse12" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading12">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>This is charged by the bank or financial institute for processing your application. </li>
																	<li>The charge is generally fixed or a percentage of the loan amount.</li>
															
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading13">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse13" aria-expanded="false" aria-controls="collapse13">
																13. Are registration, stamp duty cost covered under home loan?
																</div>
															</h4>

														</div>
														<div id="collapse13" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading13">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Registration charges, transfer charges and stamp duty costs apart from the actual loan amount are included in the total cost calculation of the home loan.</li>
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading14">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse14" aria-expanded="false" aria-controls="collapse14">
																14. What is MCLR?
																</div>
															</h4>

														</div>
														<div id="collapse14" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading14">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Marginal Cost of funds-based Lending Rate is the benchmark rate set by a lending institution below which they cannot provide loans to their customers.</li>
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading15">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse15" aria-expanded="false" aria-controls="collapse15">
																15. Can I switch from a fixed rate to a floating rate during my home loan tenure?
																</div>
															</h4>

														</div>
														<div id="collapse15" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading15">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you can switch from a fixed to floating rate of interest on your home loan during the repayment tenure. However, you will be charged a conversion fee by the lender in such cases.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading16">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse16" aria-expanded="false" aria-controls="collapseFour">
																16. How long does it take to get my application processed and the loan sanctioned?
																</div>
															</h4>

														</div>
														<div id="collapse16" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading16">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>The entire process could take anywhere between two to four weeks. It takes around a week or two for processing a home loan application if all the necessary documents are in order. </li>
																	<li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading17">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse17" aria-expanded="false" aria-controls="collapseFour">
																17. Do I need to take an insurance for my property?

																</div>
															</h4>

														</div>
														<div id="collapse17" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading17">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you will have to insure the property against fire and other hazards, as required by the bank during the loan tenure.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading19">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse19" aria-expanded="false" aria-controls="collapseFour">
																19. Can I take 2 home loans at the same time?
																</div>
															</h4>

														</div>
														<div id="collapse19" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading19">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you can take 2 home loans at the same time provided that your lender approves your eligibility to manage 2 Equated Monthly Instalments (EMIs) at the same time. However, the tax benefits on the second house will be different and you will be required to establish the property as self-occupied or let-out property.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading20">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse20" aria-expanded="false" aria-controls="collapseFour">
																20. Can I buy a house with two loans?
																</div>
															</h4>

														</div>
														<div id="collapse20" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading20">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>No, you cannot avail two home loans for the same property. Any such practice will be considered fraudulent. The Central Registry of Securitization Asset Reconstruction and Security Interest of India (CERSAI) ensures that fraudulent practices such as availing two housing loans for the same asset/property are prevented. </li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
												
												</div>
											</div>
										</div>
									</div>
								</div>
	}
								{/* Accordion end 2*/}

								
								 {/* Accordian start 3 */}
		{this.state.pagination==3 &&
								 <div class='col-lg-7 p-0 scrollableDivv' id="faq2">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading21">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse21" aria-expanded="false" aria-controls="collapseFour">
																21. Can I get 100% financing on a home loan?
																</div>
															</h4>

														</div>
														<div id="collapse21" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading21">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>No. Banks/financial institution do not grant 100% of the property value as home loan. Home loan lenders establish a margin on their loan i.e. the percentage of the cost that the lending institution will be covering. For example, if the margin on the loan is set at 10%, the bank will cover 90% of property value. In such cases, you will be required to a make a down payment of the balance amount, i.e. 10% in order to cover for the rest of the cost.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading22">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse22" aria-expanded="false" aria-controls="collapseFour">
																22. What security/collateral do I have to provide?
																</div>
															</h4>

														</div>
														<div id="collapse22" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading22">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Security can be in the form of a guarantee, wherein you will be required to provide references of one or two people known to you. Banks could also request your long term investments to be provided as security. They may include your life Insurance policies, shares/ units or any other security deemed fit by the bank.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading23">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse23" aria-expanded="false" aria-controls="collapseFour">
																23. Do I need to take an insurance for my property?
																</div>
															</h4>

														</div>
														<div id="collapse23" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading23">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes, you will have to insure the property against fire and other hazards, as required by the bank during the loan tenure.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading24">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse24" aria-expanded="false" aria-controls="collapse24">
																24. Does having a personal loan affect home loan eligibility?
																</div>
															</h4>

														</div>
														<div id="collapse24" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading24">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>When determining your home loan eligibility, the lender makes sure that your monthly repayments are not being affected by any other ongoing loans such as personal loan, two-wheeler loan, etc. However, other ongoing loans ultimately tend to affect your eligibility as your overall spending power is reduced. If your other loan commitments exceed 50%-60% of your monthly income, your home loan application may be rejected.</li>
																	{/* <li>PAN Card</li> */}
															
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading25">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse25" aria-expanded="false" aria-controls="collapse25">
																25. Can I avail loan to buy a property in another city?
																</div>
															</h4>

														</div>
														<div id="collapse25" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading25">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes. Banks provide loan to purchase property in other city after validating the property documents.</li>
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading26">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse26" aria-expanded="false" aria-controls="collapse26">
																26. Are there any additional charges to be kept in mind while purchasing a house?
																</div>
															</h4>

														</div>
														<div id="collapse26" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading26">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes. The additional charges will include: transfer charges, registration charges and stamp duty charges. This is over and above the cost of the home.</li>
																	<li>Other charges could include, booking fee or processing charges, which are usually paid to the lender when a loan is applied for. This could either be a fixed amount or it could be an amount that is a percentage of the loan amount. Pre-payment penalty is applied if the loan has been paid back in full, before the end of the duration that was previously agreed upon. A few lenders may also include consultant fees, documentation charges, etc.</li>
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading27">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse27" aria-expanded="false" aria-controls="collapse27">
																27. Can I avail home extension or improvement loan?
																</div>
															</h4>

														</div>
														<div id="collapse27" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading27">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Yes. You can avail of a home extension loan or home improvement loan or bridge loan or home construction loan or land purchase loan.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading28">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse28" aria-expanded="false" aria-controls="collapseFour">
																28. What is Balance Transfer?
																</div>
															</h4>

														</div>
														<div id="collapse28" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading28">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>A balance transfer can be availed to transfer an existing loan to a new lender at an attractive rate of interest.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading29">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse29" aria-expanded="false" aria-controls="collapseFour">
																29. What is the difference between fixed and floating interest rates?
																</div>
															</h4>

														</div>
														<div id="collapse29" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading29">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>When you avail for loan at a fixed interest rate, it will remain the same throughout the tenure, irrespective of market performance.</li>
																	<li>With a floating interest rate, market fluctuations will determine increase or decrease of interest rates.In most cases, home loans will be offered at a fixed interest Rate.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading30">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse30" aria-expanded="false" aria-controls="collapseFour">
																30. How do I pay my monthly EMI?
																</div>
															</h4>

														</div>
														<div id="collapse30" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading30">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>For monthly payments, banks may request for an Electronic Clearing System (ECS) form to be signed by you linking your salary or operational account. Besides ECS, at the time of applying for the loan, banks may ask you to submit post-dated cheques. </li>
																	<li>Do clarify your ECS debit date with the bank so you can ensure sufficient balance for payment clearance.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading31">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse31" aria-expanded="false" aria-controls="collapseFour">
																31. I submitted my application to SAKAL MONEY. Now, what next?
																</div>
															</h4>

														</div>
														<div id="collapse31" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading31">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Once your application has been electronically processed and received, it will be securely sent to the Financial Institution of your choice. You will soon be contacted by the lender directly for further process.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading32">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse32" aria-expanded="false" aria-controls="collapseFour">
																32. What is Credit history?
																</div>
															</h4>

														</div>
														<div id="collapse32" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading32">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>It basically records your repayment of past loans and credit card bills. The Credit Bureau of India Limited (CIBIL) maintains credit history and it is important that you have a good credit score with CIBIL if you wish to avail a loan in a hassle-free manner.</li>
																
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
	}
								{/* Accordion end 3*/}
								<div className='col-xl-5 text-center'>
									<img src={HomeIllustration} width='282px' height='284px' className='img-fluid' alt='home-illustraion' />
								</div>
							</div>
							
						</div>
						}

	{/* Accordion Home Loan End */}
										
									</div>
								</div>
							</div>
							<div className='tab-pane fade' id='personal-loan-tab-faq' role='tabpanel'>
								<div className='heading-faq container-fluid'>
									<div className='row  align-items-end'>
	{/* Accordion Personal Loan Start */}
	 {this.state.loanType ==='Personal Loan' &&
								<div className='heading-faq container'>
									<div className='row  align-items-center justify-content-center'>
										
                                        {/* Accordian start 1 HOME LOAN */}
		{this.state.pagination==1 &&
								<div class='col-lg-7 p-0 scrollableDivv' id="faq1">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingOne">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
																1. Is it a good idea to get a personal loan?
																</div>
															</h4>

														</div>
														<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Personal loans can be an ideal solution during financial crisis. Be it wedding expenses, home renovation or medical emergency, a personal loan can be your solution to meet the immediate financial requirements as they are easy-to-get, fast in disbursal and require no collateral.</div>
										
										
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingTwo">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																2. What is the best personal loan?
																</div>
															</h4>

														</div>
														<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
															<div class="panel-body text-14-semibold grey dot">
																<div>The best personal loan differs from borrower to borrower’s credit profile. A credit profile includes the credit score, monthly income, employer, employment type and others. All the above factors are considered to find the best personal loan.</div>
																	{/* <li>Purpose of the loan</li>
																	<li>Whether the house you are considering to purchase is ready for possession or will you be buying a plot and constructing later</li>
																	<li>Loan eligibility amount</li>
																	<li>Interest rate and EMI</li>
																	<li>Processing fee</li>
																	<li>Pre-closure fees and pre-payment fees applicable</li> */}
					
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingThree">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																3. How can I apply for personal loan?

																</div>
															</h4>

														</div>
														<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
															<div class="panel-body text-14-semibold grey dot">
																<div>You can do it online or by contacting our call center. </div>
																<div>If you apply online by filling in a brief form, you will get an in-principle approval on your query because we have partnered with several banks. This ensures faster turnaround time for your requirement.</div>
																<div>Our unique matchmaking algorithm ensures we match your requirement with the available options and share the result.</div>
																<div>One of our experts will contact you to provide information about available options and process your application. We will also arrange to get your documents and other paperwork picked up from you. </div>
																<div>If speaking to someone makes it's easier for you, you can reach us at sakalmoney.com . One of our experts will contact you to provide information about available options and process your application.</div>
																
																	// {/* <li>All you have to do is complete the eligibility form and you will get access to customized quotes from a number of loan providers. </li>
																	// <li>You can browse, compare interest rates, EMIs, repayment charges and processing fee and make an informed decision and avail the best deal.</li>															 */}
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFour">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																4. What is the eligibility for personal loan?

																</div>
															</h4>

														</div>
														<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
															<div class="panel-body text-14-semibold grey dot">
																	<div>The eligibility criteria for a personal loan are given below:</div>
																	<li>Between the age of 18/21 years - 60/65 years </li>
																	<li>Must be salaried or self-employed</li>
																	<li>Credit score of 650+ with a good credit history</li>
																	<li>Minimum monthly income of ₹15000 for non-metro cities and ₹20,000 for metro cities</li>
																	<li>Should be employed at the current organization for at least 6/12 months or business tenure of at least 3 years (continuous)</li>
																
															</div>
														</div>
													</div>
													
												
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFive">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
																5. Are personal loans good for your credit?

																</div>
															</h4>

														</div>
														<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
															<div class="panel-body text-14-semibold grey dot">
																<div>Personal loans play an important role in deciding your credit score. The effect of missing a personal loan EMI can be adverse on your credit score. One of the reasons for the same is because personal loans are unsecured in nature.</div>
																	{/* <li>Yes, you can apply for a loan with a co-applicant. All you have to do is specify it in the application form. Having a co-applicant increases your chances of availing an increased loan amount. This depends on the co-applicant's profile, income and obligations.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading6">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapseFour">
																6. How do I know my personal loan eligibility amount?

																</div>
															</h4>

														</div>
														<div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading6">
															<div class="panel-body text-14-semibold grey dot">
																
																	<div>Ideally, you should borrow only as much as you can pay back in a comfortable manner.The EMI of your loan should preferably not exceed your disposable income, which is your monthly take-home after deducting household expenses and existing EMIs for other loans.</div>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading7">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapseFour">
																7. How long does it take to get approved for a personal loan?

																</div>
															</h4>

														</div>
														<div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading7">
															<div class="panel-body text-14-semibold grey dot">
																<div>Due to digitization, personal loan approval has become instant. However, the disbursal could take a period of 5-7 days due to the documentation process.</div>
																	{/* <li>Yes, you can choose to prepay your outstanding loan amount either partially or in full before the completion of your loan tenure. While banks do not charge any prepayment fee on floating rate loans, fixed rate home loans attract a penalty up to 2% of the loan amount if prepaid through refinance.</li>
																	<li>Under Section 24 of the IT Act, taxpayers are also eligible for benefits up to Rs.2 lakh on the interest repaid against a home loan annually.</li>																 */}
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading8">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse8" aria-expanded="false" aria-controls="collapseFour">
																8. What is the best personal loan to get?
								

																</div>
															</h4>

														</div>
														<div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
															<div class="panel-body text-14-semibold grey dot">
																<div>There is no such things as best personal loan. Every borrower needs to find the lender that best suits his/her needs. In order to do that, you can either compare the different lenders offline or apply at platforms such as SAKAL MONEY who help you select the lender as per your requirements.</div>
																	{/* <li>The co-applicant can be an immediate family member such as your spouse, your parents or even your major children. It is also mandatory for all co-owners of the property to be co-applicants while applying for a loan. However, the co-applicant need not be a co-owner.</li> */}
																
															</div>
														</div>
													</div>
												</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading9">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse9" aria-expanded="false" aria-controls="collapseFour">
																9. Can you pay off a personal loan early?

																</div>
															</h4>

														</div>
														<div id="collapse9" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading9">
															<div class="panel-body text-14-semibold grey dot">
																<div>Of course, you can pay off a personal loan early. This is known as prepayment of a personal loan. However, this could attract a specific amount as penalty which would differ from lender-to-lender.</div>
																	{/* <li>Pre-EMI is defined as the interest that is to be paid to the loan provider until the entire loan amount is disbursed. The Pre-EMI is payable on a monthly basis until the last disbursement, post which the regular EMI will be applicable comprising the principal and interest components.</li> */}
																
															</div>
														</div>
													</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading10">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse10" aria-expanded="false" aria-controls="collapseFour">
																10. What is the average interest rate on a personal loan?


																</div>
															</h4>

														</div>
														<div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading10">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>The interest rate on a personal loan ranges from 10.75% - 35% which differs from lender to lender.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading11">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse11" aria-expanded="false" aria-controls="collapseFour">
																11. What is the minimum and maximum amount that can be issued as a personal loan?



																</div>
															</h4>

														</div>
														<div id="collapse11" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading11">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Personal loans are available in the range of Rs. 50,000 to Rs. 50 lakhs.</div>
																	{/* <div>1. Age </div>
																	<div>2. Monthly Income </div>
																	<div>3. Credit Score </div>
																	<div>4. Credit History </div>
																	<div>5. Documents</div> */}
																
															</div>
														</div>
													</div>
											</div>
										</div>
									</div>
								</div>
								}
								{/* Accordion end 1 */}

								 {/* Accordian start 2 */}
		{this.state.pagination==2 &&
								 <div class='col-lg-7 p-0 scrollableDivv' id="faq2">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading12">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse12" aria-expanded="false" aria-controls="collapse12">
																12. What do banks look at when applying for a personal loan?

																</div>
															</h4>

														</div>
														<div id="collapse12" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading12">
															<div class="panel-body text-14-semibold grey dot">
																	<div>The banks consider the following factors when looking at a personal loan application:</div>
																	{/* <li>This is charged by the bank or financial institute for processing your application. </li>
																	<li>The charge is generally fixed or a percentage of the loan amount.</li> */}
																	<div>1. Age </div>
																	<div>2. Monthly Income </div>
																	<div>3. Credit Score </div>
																	<div>4. Credit History </div>
																	<div>5. Documents</div>
															
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading13">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse13" aria-expanded="false" aria-controls="collapse13">
																13. What is the maximum tenure of a personal loan?

																</div>
															</h4>

														</div>
														<div id="collapse13" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading13">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Most banks and NBFC's provide loan for a minimum of 12 months to a maximum 5 years (60 months).</div>
																	{/* <li>Registration charges, transfer charges and stamp duty costs apart from the actual loan amount are included in the total cost calculation of the home loan.</li> */}
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading14">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse14" aria-expanded="false" aria-controls="collapse14">
																14. Who has the best personal loan rates?

																</div>
															</h4>

														</div>
														<div id="collapse14" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading14">
															<div class="panel-body text-14-semibold grey dot">
																	<div>The best personal loan interest rates depend on the credit profile of a customer. In order to get the best rates, a customer must have a good credit score, consistent source of income, should be salaried/self-employed.</div>
																	{/* <li>Marginal Cost of funds-based Lending Rate is the benchmark rate set by a lending institution below which they cannot provide loans to their customers.</li> */}
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading15">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse15" aria-expanded="false" aria-controls="collapse15">
																15. How long does the processing of the loan take?
																</div>
															</h4>

														</div>
														<div id="collapse15" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading15">
															<div class="panel-body text-14-semibold grey dot">
																	<div>A loan approval process can take anywhere between 48 hours to one week, depending on the documentation. The disbursement of the loan is done on completion of all paperwork including submission of ECS (Electronic Clearing System) and / or PDC (postdated cheques). </div>
																	{/* <li>Yes, you can switch from a fixed to floating rate of interest on your home loan during the repayment tenure. However, you will be charged a conversion fee by the lender in such cases.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading16">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse16" aria-expanded="false" aria-controls="collapseFour">
																16. How can I compare loans from different providers?
																</div>
															</h4>

														</div>
														<div id="collapse16" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading16">
															<div class="panel-body text-14-semibold grey dot">
																	<div>All you have to do is complete the eligibility form on SAKAL MONEY and gain access to customized quotes from a number of loan providers. You can browse, compare interest rates, EMIs, repayment charges and processing fee and make an informed decision.</div>
																	{/* <li>The entire process could take anywhere between two to four weeks. It takes around a week or two for processing a home loan application if all the necessary documents are in order. </li>
																	<li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading17">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse17" aria-expanded="false" aria-controls="collapseFour">
																17. What if my loan application is rejected due to some reason?


																</div>
															</h4>

														</div>
														<div id="collapse17" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading17">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Before submitting your application, we scrutinize your documentation and mitigate any probability of a rejection.</li>
																	<li>However, in case your application is rejected, our loan experts ensure your application is processed through another bank/ NBFC.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading18">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse18" aria-expanded="false" aria-controls="collapseFour">
																18. How do I pay my monthly EMI?

																</div>
															</h4>

														</div>
														<div id="collapse18" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading18">
															<div class="panel-body text-14-semibold grey dot">
																	<div>For monthly payments, banks may request for an Electronic Clearing System (ECS) form to be signed by you linking your salary or operational account. Besides ECS, at the time of applying for the loan, banks may ask you to submit post-dated cheques. </div>
																	<div>Do clarify your ECS debit date with the bank so you can ensure sufficient balance for payment clearance.</div>
																	{/* <li>Yes, you can take 2 home loans at the same time provided that your lender approves your eligibility to manage 2 Equated Monthly Instalments (EMIs) at the same time. However, the tax benefits on the second house will be different and you will be required to establish the property as self-occupied or let-out property.</li> */}
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading19">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse19" aria-expanded="false" aria-controls="collapseFour">
																19. What pre or part payment charges I should consider while taking a loan?
																</div>
															</h4>

														</div>
														<div id="collapse19" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading19">
															<div class="panel-body text-14-semibold grey dot">
																	<div>The tenure to repay the loan ranges from 1 to 5 years. In case of early payment of loan, pre-payment charges may apply. This could go up to, as high as 5% of the principle outstanding (balance loan amount), and it could also vary depending on the borrower's credit profile as well as the bank's policies.</div>
																	{/* <li>Yes, you can take 2 home loans at the same time provided that your lender approves your eligibility to manage 2 Equated Monthly Instalments (EMIs) at the same time. However, the tax benefits on the second house will be different and you will be required to establish the property as self-occupied or let-out property.</li> */}
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading20">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse20" aria-expanded="false" aria-controls="collapseFour">
																20. How will I receive the money in my account after disbursement?
																</div>
															</h4>

														</div>
														<div id="collapse20" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading20">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>The amount will be credited to your bank account.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading21">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse21" aria-expanded="false" aria-controls="collapseFour">
																21. Is a guarantor necessary?
																</div>
															</h4>

														</div>
														<div id="collapse21" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading21">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>No. Typically, you do not have to provide a guarantor; however, some lenders may demand one.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading22">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse22" aria-expanded="false" aria-controls="collapseFour">
																22. What happens if I default on an ECS payment?
																</div>
															</h4>

														</div>
														<div id="collapse22" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading22">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Firstly, you will be levied a fee for late payment.</li>
																	<li>Secondly, all your loan transactions are collected by Credit Information Bureau of India Ltd. (CIBIL). Defaulting on a loan will show up poorly on your credit history. This could pose a problem when applying for a loan in the future.</li>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading23">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse23" aria-expanded="false" aria-controls="collapseFour">
																23. What is Credit history?
																</div>
															</h4>

														</div>
														<div id="collapse23" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading23">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>It basically records your repayment of past loans and credit card bills. The Credit Bureau of India Limited (CIBIL) maintains credit history and it is important that you have a good credit score with CIBIL if you wish to avail a loan in a hassle-free manner.</li>
																	{/* <li>Additionally, it may take a week or two for the bank to inspect the property papers and make the disbursement. The faster you complete documentation, the faster your application moves.</li> */}
																
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
	}
								{/* Accordion end 2*/}

								
								 {/* Accordian start 3 */}
		{this.state.pagination==3 &&
								 <div class='col-lg-7 p-0 scrollableDivv' id="faq2">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	


													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading25">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse25" aria-expanded="false" aria-controls="collapse25">
																25. Will I be charged by SAKAL MONEY for services offered?
																</div>
															</h4>

														</div>
														<div id="collapse25" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading25">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>No. The services offered by SAKAL MONEY are completely free of charge.</li>
															
															</div>
														</div>
													</div>
												
													
												
												</div>
											</div>
										</div>
									</div>
								</div>
	}
								{/* Accordion end 3*/}
								<div className='col-xl-5 text-center'>
									<img src={HomeIllustration} width='282px' height='284px' className='img-fluid' alt='home-illustraion' />
								</div>
							</div>
							
						</div>
						}

	{/* Accordion Personal Loan End */}
										
									</div>
								</div>
							</div>
							
							<div className='tab-pane fade' id='car-loan-tab-faq' role='tabpanel'>
								<div className='heading-faq container-fluid'>
									<div className='row  align-items-end'>
                                    {/* Accordion Car Loan Start */}
	 {this.state.loanType ==='Car Loan' &&
								<div className='heading-faq container'>
									<div className='row  align-items-center justify-content-center'>
										
                                        {/* Accordian start 1  */}
		{this.state.pagination==1 | this.state.pagination==2 | this.state.pagination==3 &&
								<div class='col-lg-7 p-0 scrollableDivv' id="faq1">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingOne">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
																1. What is car Loan?
																</div>
															</h4>

														</div>
														<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
															<div class="panel-body text-14-semibold grey dot">
																	<div>A car loan is a borrowing instrument that a lender such as a bank or NBFC (non-banking financial company) provides an individual allowing him/her to purchase a car. With the increased popularity of car loans, most banks and NBFCs currentlyoffer this type of loan to individuals who have a good credit history.</div>
										
										
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingTwo">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																2. What are the benefits of applying for a car loan with SMAPL?
																</div>
															</h4>

														</div>
														<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
															<div class="panel-body text-14-semibold grey dot">
																<div>When you input your basic details into the SMAPLcar loan eligibility tool, we provide you with all available options based on the information you provide us. After you get the complete list of lenders who might suit your specific requirement you can compare the various loan options based on tenure, interest rate, maximum loan amount as well as other factors.</div>
																<div>SMAPL streamlines the loan selection process, allowing you to derive the maximum benefits from your car loan.</div>
					
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingThree">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																3.What is the maximum amount of Loan that I can avail?

																</div>
															</h4>

														</div>
														<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
															<div class="panel-body text-14-semibold grey dot">
																<div>The maximum loan amount approved may vary from one bank to the other. Usually, banks approve loan amounts that range from 80%–90% of the car’s on-road price. Few banks even lend 100% of the car’s ex-showroom price. In addition to these criteria, the percentage of financing offered depends on the price, type of car (standard/ premium) and whether you are applying for a new or pre-owned car.</div>
																{/* <div>If you apply online by filling in a brief form, you will get an in-principle approval on your query because we have partnered with several banks. This ensures faster turnaround time for your requirement.</div>
																<div>Our unique matchmaking algorithm ensures we match your requirement with the available options and share the result.</div>
																<div>One of our experts will contact you to provide information about available options and process your application. We will also arrange to get your documents and other paperwork picked up from you. </div>
																<div>If speaking to someone makes it's easier for you, you can reach us at sakalmoney.com . One of our experts will contact you to provide information about available options and process your application.</div> */}
																
																	// {/* <li>All you have to do is complete the eligibility form and you will get access to customized quotes from a number of loan providers. </li>
																	// <li>You can browse, compare interest rates, EMIs, repayment charges and processing fee and make an informed decision and avail the best deal.</li>															 */}
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFour">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																4. What is the typical tenure of Car Loan?

																</div>
															</h4>

														</div>
														<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
															<div class="panel-body text-14-semibold grey dot">
																	<div>The tenure of a car loan ranges from 1 year to 5 years. The shorter the loan tenure, the higher is the EMI payable and the reverse is true for longer car loan tenures.</div>
																	{/* <li>Between the age of 18/21 years - 60/65 years </li>
																	<li>Must be salaried or self-employed</li>
																	<li>Credit score of 650+ with a good credit history</li>
																	<li>Minimum monthly income of ₹15000 for non-metro cities and ₹20,000 for metro cities</li>
																	<li>Should be employed at the current organization for at least 6/12 months or business tenure of at least 3 years (continuous)</li> */}
																
															</div>
														</div>
													</div>
													
												
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFive">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
																5. Do I need a Loan guarantor or co-borrower?

																</div>
															</h4>

														</div>
														<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
															<div class="panel-body text-14-semibold grey dot">
																<div>A loan guarantor or a co-borrower is only required if you are unable to meet the eligibility criteria stated by the lending institution such as monthly income, age or credit score. Otherwise you can apply for a car loan on your own.</div>
																	{/* <li>Yes, you can apply for a loan with a co-applicant. All you have to do is specify it in the application form. Having a co-applicant increases your chances of availing an increased loan amount. This depends on the co-applicant's profile, income and obligations.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading6">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapseFour">
																6.Can I sell my vehicles before I repay the entire Loan?

																</div>
															</h4>

														</div>
														<div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading6">
															<div class="panel-body text-14-semibold grey dot">
																
																	<div>You cannot enter a transaction with any seller without a 'No Objection Certificate' (NOC) from Bank. The NOC can only be obtained after foreclosure or after you have paid off your loan</div>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading7">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapseFour">
																7. How long does it take to get approved for a personal loan?

																</div>
															</h4>

														</div>
														<div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading7">
															<div class="panel-body text-14-semibold grey dot">
																<div>DBefore we process a foreclosure, all outstanding dues must be cleared. So we request you to first check for and clear any remaining amount that may be payable towards your Car Loan by requesting a foreclosure statement from your nearestBank.</div>
																	{/* <li>Yes, you can choose to prepay your outstanding loan amount either partially or in full before the completion of your loan tenure. While banks do not charge any prepayment fee on floating rate loans, fixed rate home loans attract a penalty up to 2% of the loan amount if prepaid through refinance.</li>
																	<li>Under Section 24 of the IT Act, taxpayers are also eligible for benefits up to Rs.2 lakh on the interest repaid against a home loan annually.</li>																 */}
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading8">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse8" aria-expanded="false" aria-controls="collapseFour">
																8. Can I get 100% funding to buy a car?
								

																</div>
															</h4>

														</div>
														<div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
															<div class="panel-body text-14-semibold grey dot">
																<div>The maximum amount of loan that you can avail to buy a car will vary from lender to lender. Most banks offer financing up to 90% of the on-road price of the car but there are some banks such as HDFC Bank, ICICI Bank, etc., that offers financing for up to 100% of the car’s on-road price.</div>
																	{/* <li>The co-applicant can be an immediate family member such as your spouse, your parents or even your major children. It is also mandatory for all co-owners of the property to be co-applicants while applying for a loan. However, the co-applicant need not be a co-owner.</li> */}
																
															</div>
														</div>
													</div>
												</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading9">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse9" aria-expanded="false" aria-controls="collapseFour">
																9. What is the lowest EMI that I need to pay for a car loan?

																</div>
															</h4>

														</div>
														<div id="collapse9" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading9">
															<div class="panel-body text-14-semibold grey dot">
																<div>The amount of EMI (equated monthly instalments) that you will be paying towards your car loan will depend on the interest rate, loan amount, and the repayment tenure you choose. You can calculate the EMI. For example, let us suppose that you avail a car loan of Rs.1 lakh at an interest rate of 12% for a tenure of 5 years, calculated the EMI and found it to be Rs.2,224.</div>
																	{/* <li>Pre-EMI is defined as the interest that is to be paid to the loan provider until the entire loan amount is disbursed. The Pre-EMI is payable on a monthly basis until the last disbursement, post which the regular EMI will be applicable comprising the principal and interest components.</li> */}
																
															</div>
														</div>
													</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading10">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse10" aria-expanded="false" aria-controls="collapseFour">
																10. Can I get a lower interest rate if I have a good credit score


																</div>
															</h4>

														</div>
														<div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading10">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>If your credit score is above 750, can negotiate with the banks to offer you a car loan at a lower interest rate. Many lenders will let you negotiate on the interest rates since your high credit score is an indication of your high repayment capacity. Some lenders may also offer you a waiver on the processing fee if you have a good credit score.</li>
																
															</div>
														</div>
													</div>
													
											</div>
										</div>
									</div>
								</div>
								}
								{/* Accordion end 1 */}

								
							
								<div className='col-xl-5 text-center'>
									<img src={HomeIllustration} width='282px' height='284px' className='img-fluid' alt='home-illustraion' />
								</div>
							</div>
							
						</div>
						}

	{/* Accordion Car Loan End */}
										
									</div>
								</div>
							</div>

							<div className='tab-pane fade' id='bussiness-loan-tab-faq' role='tabpanel'>
								<div className='heading-faq container-fluid'>
									<div className='row  align-items-end'>
										{/* Accordion business Loan Start */}
	 {this.state.loanType ==='Business Loan' &&
								<div className='heading-faq container'>
									<div className='row  align-items-center justify-content-center'>
										
                                        {/* Accordian start 1  */}
		{this.state.pagination==1 | this.state.pagination==2 | this.state.pagination==3 &&
								<div class='col-lg-7 p-0 scrollableDivv' id="faq1">
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingOne">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
																Why should I take a business loan?
																</div>
															</h4>

														</div>
														<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Mobilizing money for smooth business operation is critical for any business. An unsecured business loan gives you access to credit, which can be repaid over a period of time. It can be used for expansion of an existing business or investing in a new one without pledging anything against the borrowed amount.</div>
										
										
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingTwo">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																Who can avail of a business loan?

																</div>
															</h4>

														</div>
														<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
															<div class="panel-body text-14-semibold grey dot">
																<li>Self-employed individuals/ professionals (like doctors, architects, chartered accountants, business consultants)</li>
																<li>Sole proprietorship firms</li>
																<li>Partnership firms</li>
																<li>Private limited companies</li>
																<li>Closely held and public limited companies</li>
					
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingThree">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																What is the eligibility criteria for availing of a business loan?

																</div>
															</h4>

														</div>
														<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
															<div class="panel-body text-14-semibold grey dot">
																	 <li>Your firm should be at least 3 years old. </li>
																	 <li>For a net income of up to Rs. 1.5 lakhs, a firm can avail loan of up to Rs. 15 lakhs.</li>
																	 <li>The above figures are only indicative, the actual eligibility criteria varies across financial institutions.</li>
																	 
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFour">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																What is the loan processing time?


																</div>
															</h4>

														</div>
														<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
															<div class="panel-body text-14-semibold grey dot">
																	<div>Typically, 5 working days after all documents are submitted.</div>
																	{/* <li>Between the age of 18/21 years - 60/65 years </li>
																	<li>Must be salaried or self-employed</li>
																	<li>Credit score of 650+ with a good credit history</li>
																	<li>Minimum monthly income of ₹15000 for non-metro cities and ₹20,000 for metro cities</li>
																	<li>Should be employed at the current organization for at least 6/12 months or business tenure of at least 3 years (continuous)</li> */}
																
															</div>
														</div>
													</div>
													
												
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFive">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
																What is the loan amount one can avail?


																</div>
															</h4>

														</div>
														<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
															<div class="panel-body text-14-semibold grey dot">
																<div>An unsecured business loan ranges from Rs. 10 lakhs up to Rs. 1.25 cr depending upon the financial eligibility.</div>
																	{/* <li>Yes, you can apply for a loan with a co-applicant. All you have to do is specify it in the application form. Having a co-applicant increases your chances of availing an increased loan amount. This depends on the co-applicant's profile, income and obligations.</li> */}
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading6">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapseFour">
																How do I pay the EMI?

																</div>
															</h4>

														</div>
														<div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading6">
															<div class="panel-body text-14-semibold grey dot">
																
																	<div>For monthly payments, banks may request for an Electronic Clearing System (ECS) form to be signed by you linking your salary or operational account. Besides ECS, at the time of applying for the loan, banks may ask you to submit post-dated cheques</div>
																	<div>Do clarify your ECS debit date with the bank so you can ensure sufficient balance for payment clearance.</div>
																
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading7">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapseFour">
																Can I pre-pay my loan?

																</div>
															</h4>

														</div>
														<div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading7">
															<div class="panel-body text-14-semibold grey dot">
																<div>Yes, but most financial institutions allow part pay after 6 months from the date of disbursement.</div>
																	{/* <li>Yes, you can choose to prepay your outstanding loan amount either partially or in full before the completion of your loan tenure. While banks do not charge any prepayment fee on floating rate loans, fixed rate home loans attract a penalty up to 2% of the loan amount if prepaid through refinance.</li>
																	<li>Under Section 24 of the IT Act, taxpayers are also eligible for benefits up to Rs.2 lakh on the interest repaid against a home loan annually.</li>																 */}
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading8">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse8" aria-expanded="false" aria-controls="collapseFour">
																Will I be charged by SAKAL MONEY for services offered?

								

																</div>
															</h4>

														</div>
														<div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
															<div class="panel-body text-14-semibold grey dot">
																<div>No. The services offered by SAKAL MONEY are completely free of charge.</div>
																	{/* <li>The co-applicant can be an immediate family member such as your spouse, your parents or even your major children. It is also mandatory for all co-owners of the property to be co-applicants while applying for a loan. However, the co-applicant need not be a co-owner.</li> */}
																
															</div>
														</div>
													</div>
												</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading9">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse9" aria-expanded="false" aria-controls="collapseFour">
																I submitted my application to SAKAL MONEY. Now, what next?


																</div>
															</h4>

														</div>
														<div id="collapse9" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading9">
															<div class="panel-body text-14-semibold grey dot">
																<div>Once your application has been received, it will be securely sent to the financial institution of your choice. We will be in touch with you throughout the disbursement process.</div>
																	{/* <li>Pre-EMI is defined as the interest that is to be paid to the loan provider until the entire loan amount is disbursed. The Pre-EMI is payable on a monthly basis until the last disbursement, post which the regular EMI will be applicable comprising the principal and interest components.</li> */}
																
															</div>
														</div>
													</div>
												<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="heading10">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse10" aria-expanded="false" aria-controls="collapseFour">
																What if my application is rejected?


																</div>
															</h4>

														</div>
														<div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading10">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>In an unlikely scenario of rejection, we will help you rectify the shortcoming and re-process the application.</li>
																
															</div>
														</div>
													</div>
													
											</div>
										</div>
									</div>
								</div>
								}
								{/* Accordion end 1 */}

								
							
								<div className='col-xl-5 text-center'>
									<img src={HomeIllustration} width='282px' height='284px' className='img-fluid' alt='home-illustraion' />
								</div>
							</div>
							
						</div>
						}

	{/* Accordion Business Loan End */}
										
									</div>
								</div>
							</div>
						</div>

							{/* paggiation */}
					<div className='container'>
					<div className='row align-items-center '>
						<div className='col-lg-7 '>
							{/* <nav aria-label="..."> */}
								<ul class="pagination pagination-sm  text-14-semibold d-flex align-items-center">
									{/* <li class="page-item">
									<a onClick={this.pagination} class="page-link " href="#" tabindex="-1">5</a>
									</li> */}
									{/* <li class="page-item"><a onClick={this.pagination} class="page-link" href="#">3</a></li> */}
									<li class="page-item "><a onClick={this.pagination} class={this.state.pagination==1 | this.state.loanType=='Car Loan' | this.state.loanType=='Business Loan' ? "page-link activee" : "page-link"} href="#">1</a></li>
								{this.state.loanType ==='Home Loan' | this.state.loanType ==='Personal Loan' ?
									<li class="page-item"><a onClick={this.pagination} class={this.state.pagination==2 ? "page-link activee" : "page-link"} href="#">2</a></li>:null}
								{this.state.loanType ==='Home Loan' | this.state.loanType ==='Personal Loan' ?	
									<li class="page-item"><a onClick={this.pagination} class={this.state.pagination==3 ? "page-link activee" : "page-link"} href="#">3</a></li>:null}
								</ul>
							{/* </nav> */}
							
						</div>
					</div>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Faq;
