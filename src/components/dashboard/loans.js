import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
// images
import Car from "../../images/sakal-car.svg";
import Home from "../../images/home-loan.svg";
import PersonalLoanImg from "../../images/personal-loan.svg";
import BusinessLoanImg from "../../images/business-loan.svg";

class Loans extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-2 pl-0'>
						<Navigation nav={2} />
					</div>
					<div className='col-xl-10 loans'>
						<header>
							<h1>
								Welcome back, Aakash! <span>30 September 2019</span>
							</h1>
							<p>Here’s your loan applications, their status and more details for the smoothest sanctions ever.</p>
						</header>
						<div className='loan-section'>
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
												<h3>Over 92% of computers are infected with Adware and spyware. Such software is rarely accompanied by uninstall utility and even</h3>
											</div>
											<div className='cta'>
												<a href='/dashboard/search' className=' primary'>
													view offers
												</a>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className='loan-section'>
							<div className='status-card'>
								<article>
									<div className='img'>
										<div className='bg-underlay'> </div>
										<img src={Home} className='loan-subject-img img-fluid' alt='card-loan-illustarion' />
									</div>
									<div className='right-detail'>
										<div className='detail-row'>
											<div className='details'>
												<h2>Home Loan</h2>
												<h3>Over 92% of computers are infected with Adware and spyware. Such software is rarely accompanied by uninstall utility and even</h3>
											</div>
											<div className='cta'>
												<a href='/dashboard/search' className=' primary'>
													view offers
												</a>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className='loan-section'>
							<div className='status-card'>
								<article>
									<div className='img'>
										<div className='bg-underlay'> </div>
										<img src={PersonalLoanImg} className='loan-subject-img img-fluid' alt='card-loan-illustarion' />
									</div>
									<div className='right-detail'>
										<div className='detail-row'>
											<div className='details'>
												<h2>Personal Loan</h2>
												<h3>Over 92% of computers are infected with Adware and spyware. Such software is rarely accompanied by uninstall utility and even</h3>
											</div>
											<div className='cta'>
												<a href='/dashboard/search' className=' primary'>
													view offers
												</a>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className='loan-section'>
							<div className='status-card'>
								<article>
									<div className='img'>
										<div className='bg-underlay'> </div>
										<img src={BusinessLoanImg} className='loan-subject-img img-fluid' alt='card-loan-illustarion' />
									</div>
									<div className='right-detail'>
										<div className='detail-row'>
											<div className='details'>
												<h2>Business Loan</h2>
												<h3>Over 92% of computers are infected with Adware and spyware. Such software is rarely accompanied by uninstall utility and even</h3>
											</div>
											<div className='cta'>
												<a href='/dashboard/search' className=' primary'>
													view offers
												</a>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Loans;
