import React, { Component } from "react";
import axios from "axios";

import qs from "querystring";
import $ from "jquery";
import Header from "../headerFooter/header";
import Footer from "../headerFooter/footer";
import SimpleReactValidator from "simple-react-validator";

// API
import { loanDropDown, cityList } from "../../services/dropDown";

import FloatingForm from "./floatingForm";
import Lenders from "../../images/35-lenders.svg";
import Loans from "../../images/2-l-loans.svg";
import Advisors from "../../images/500-advisors.svg";
import Years from "../../images/85-years.svg";

import IconThirdSec from "../../images/Sakal icons1.svg";
import IconThirdSecPersonal from "../../images/personal-assistance-icon.svg";
import IconThirdSecVariety from "../../images/variety-of-offers-icon.svg";

import CardSec1 from "../../images/Group 21.svg";
import CardSec2 from "../../images/Group 26.svg";
import CardSec3 from "../../images/Group 28.svg";
import CardSec4 from "../../images/Group 39.svg";

import "react-select/dist/react-select.css";
import VirtualizedSelect from "react-virtualized-select";
import Slider from "react-slick";
import { Link } from "react-router-dom";
//slider images

import PersonalBanner from "../../images/personal.png";
// import CarBanner from "../../images/car.png";
import CarBanner from "../../images/loanAgainstProperty.png";
import HomeBanner from "../../images/home.png";
import BusinessBanner from "../../images/business.png";

//bank logo slider
import Hdbfc from "../../images/hdb fc.png";
import HdfcSales from "../../images/hdfc sales.png";
import Hdfc from "../../images/hdfc.png";

// Context import
// import commonContext from "../../context/conmonContext";

import Finserv from "../../images/bajaj finserv.png";
import Baroda from "../../images/bank of baroda.png";
import Maharashtra from "../../images/bank of maharashtra.png";
import Icici from "../../images/icici logo.png";
import Axis from "../../images/Axis bank logo.png";
import Aditya from "../../images/aditya birla .png";
import Federal from "../../images/federal bank.png";
import Fullerton from "../../images/fullerton india.png";
import Gruh from "../../images/gruh.png";
import IDBI from "../../images/IDBI bank logo.png";
import Idfc from "../../images/idfc first.png";
import Indiabulls from "../../images/indiabulls.png";
import Indusind from "../../images/indusind.png";
import LT from "../../images/L_T.png";
import Lic from "../../images/LIC logo.png";
import Loan from "../../images/Loan tap.png";
import Magma from "../../images/magma.png";
import Newgrowth from "../../images/Newgrowth logo.png";
import Piramal from "../../images/piramal.png";
import Pnb from "../../images/PNB housing logo.png";
import Poonawalla from "../../images/Poonawalla finance logo.png";
import Rbl from "../../images/RBL bank logo.png";
import Sbi from "../../images/SBI logo .png";
import Standard from "../../images/Standard Chartered logo.png";
import Tata from "../../images/tata capital logo.png";
import West from "../../images/West end bank logo.png";
import YesBank from "../../images/Yes bank logo.png";
import { CoreStateContext } from "../../context/core";
import { setHomeData } from "../../context/core/core.actions";
import LoanTypeForm from "../common/loan-type-form/loan-type-form";

class Home extends Component {
	static contextType = CoreStateContext;
	constructor() {
		super();

		this.state = {
			nav1: null,
			nav2: null,
			city: "",
			age: "",
			loanAmount: "",
			loanType: "",
			cityBottom: "",
			ageBottom: "",
			loanAmountBottom: "",
			loanTypeBottom: "",
			authenticated: "",
			loan: "",
			accessToken: "qweriewosidjc",
			cityOptions: []
		};
		this.validator = new SimpleReactValidator();
	}
	apply = e => {
		console.log("Function Called");
		console.log(this.state.authenticated);
		console.log(this.validator.allValid());
		this.setState({
			city: e.value
		});
	};

	checkValidation = e => {
		// if (this.validator.fieldValid("LoanType") && this.validator.fieldValid("age") && this.validator.fieldValid("LoanAmount") && this.validator.fieldValid("City")) {
		if (this.validator.allValid()) {
			const userData = {
				city: this.state.city,
				age: this.state.age,
				loanAmount: this.state.loanAmount,
				loanType: this.state.loanType
			};
			sessionStorage.setItem("userData", JSON.stringify(userData));
			this.props.history.push("/sign-up");
		} else {
			this.validator.showMessages();
			// rerender to show messages for the first time
			// you can use the autoForceUpdate option to do this automatically`
			this.forceUpdate();
		}
	};
	applyBottom = () => {
		this.validator.showMessageFor("City");
		this.validator.showMessageFor("Age");
		this.validator.showMessageFor("LoanAmount");
		this.validator.showMessageFor("LoanType");
		this.forceUpdate();
	};
	loanType = e => {
		e.preventDefault();
		this.setState({ loanType: e.target.innerHTML });
	};

	async componentDidMount() {
		const loanDropDownTemp = await loanDropDown();
		const loadDropDownList = loanDropDownTemp.data;
		console.log(JSON.stringify(loadDropDownList));
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2,
			loan: loadDropDownList
		});
		this.cityList();
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

	render() {
		const { loan, cityOptions } = this.state;
		var settings = {
			dots: false,
			speed: 2000,
			slidesToShow: 6,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			centerMode: true,
			centerPadding: "0",
			cssEase:'linear'
		};
		var banner = {
			dots: false,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 4000,
			className: "slider-for"
			//	asNavFor: '.slider-nav'
		};
		var contentSetting = {
			dots: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 4000,
			className: "slider-nav",
			vertical: true
			//	asNavFor: '.slider-for',
		};

		$(document).on("click", ".dropdown-menu .dropdown-item", function() {
			let value = $(this).text();
			$(this)
				.parent(".dropdown-menu")
				.siblings(".dropdown-button")
				.text(value);
		});

		$(window).scroll(function() {
			if ($(window).scrollTop() >= 1900) {
				$(".floating-form-section").removeClass("sticky");
			} else {
				$(".floating-form-section").addClass("sticky");
			}
		});

		return (
			// <commonContext.Provider value={{
			// 	loanType: 'CITY',
			// 	age: this.state.age,
			// 	loanAmount: this.state.loanAmount,
			// 	city: this.state.city
			// }}>
			<div>
				{/* loanType: this.state.loanType, */}
				{/* <div className="toptest" onClick={this.updateValue}>
					Testing is the case
				</div> */}
				<Header active={1} />

				<section className='banner-section  p-0'>
					{/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
						<ol class="carousel-indicators">
							<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
						</ol>
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img src={Banner} class="" alt="First slideFirst slideFirst slide" />
							
							</div>
							<div class="carousel-item">
								<img src={Banner} class=" " alt="..." />
							</div>
							<div class="carousel-item">
								<img src={Banner} class=" " alt="..." />
							</div>
						</div>

					</div> */}
					<Slider {...banner} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
						<div className='item '>
							<img src={PersonalBanner} class='slider-img' alt=''/>
						</div>
						<div className='item '>
							<img src={HomeBanner} class='slider-img' alt=''/>
						</div>
						<div className='item'>
							<img src={BusinessBanner} class='slider-img' alt=''/>
						</div>
						<div className='item'>
							<img src={CarBanner} class='slider-img' alt='' />
						</div>
					</Slider>

					<div className='container slider-content'>
						<div class=''>
							<h5>Turn your dreams into reality by taking quick </h5>
							<Slider {...contentSetting} asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}>
								<div className='content-item '>
									<h3>Personal loan</h3>
								</div>
								<div className='content-item '>
									<h3>home loan</h3>
								</div>
								<div className='content-item'>
									<h3>Business loan</h3>
								</div>
								<div className='content-item'>
									<h3>loan Against Property</h3>
								</div>
							</Slider>
							<p>Big fat Indian wedding or Travel plans, suites it all.</p>
						</div>
					</div>
					<div className='overlay-section'></div>
				{/* secion second start */}
				<section className='first-section'></section>
				</section>
				
				<section className='second-section'>
					<div className='container p-0'>
						<div className='main-heading'>
							<span className='span-heading'>Just 4 steps</span> & you are ready to go!
						</div>
						<div className='row'>
							<div className='col-xl-6 col-sm-6 col-lg-6 card-part'>
								<div className='card-sec '>
									<div className='icon'>
										<img src={CardSec1} alt=''/>
									</div>
									<div class='card'>
										<div class='card-body'>
											<h5 class='card-title text-20-bold mb-0'>Register</h5>
											<p class='card-text text-16-regular'>Get a personalised Dashboard for all your loan enquiries, application process and more.</p>
										</div>
									</div>
								</div>
								<div className='card-sec '>
									<div className='icon'>
										<img src={CardSec2} alt=''/>
									</div>
									<div class='card'>
										<div class='card-body'>
											<h5 class='card-title text-20-bold mb-0'>View Offers</h5>
											<p class='card-text text-16-regular'>We give you the best offers according to your profile so that you can explore and choose from more than 35+ banks and other lenders.</p>
										</div>
									</div>
								</div>

								<div className='card-sec '>
									<div className='icon'>
										<img src={CardSec3} alt=''/>
									</div>
									<div class='card'>
										<div class='card-body'>
											<h5 class='card-title text-20-bold mb-0'>Get FREE credit score</h5>
											<p class='card-text text-16-regular'>Complete all the required details and submit you documents. Psst! We have special document pick up service too.</p>
										</div>
									</div>
								</div>

								<div className='card-sec '>
									<div className='icon'>
										<img src={CardSec4} alt=''/>
									</div>
									<div class='card'>
										<div class='card-body'>
											<h5 class='card-title text-20-bold mb-0'>Fill loan application</h5>
											<p class='card-text text-16-regular'>Get a Sakal money representative to guide you and advice you on your loan application process.</p>
										</div>
									</div>
								</div>
							</div>
							<div className='col-xl-6  col-sm-6 col-lg-6'></div>
						</div>
					</div>
				</section>
				{/* secion second end */}
				{/* secion third start */}
				<section className='third-section'>
					<div className='container p-0'>
						<div className='main-heading'>
							Why <span className='span-heading'>choose Sakal Money?</span>
						</div>
						<div className='row'>
							<div className='col-xl-6  col-sm-6 col-lg-6 left-float'>
								<div className='choose-sakal-money-card'>
									<img src={IconThirdSecVariety} className='img-fluid' />
									<div className='right-part-sakal-card'>
										<h5 class='card-title'>Variety of Offers</h5>
										<p class='card-text text-18-regular'>Choose from more than 35 banks and lenders to compare factors like rate of interest, secial requirements, processing fee and more. </p>
									</div>
								</div>
								<div className='choose-sakal-money-card'>
									<img src={IconThirdSec} className='img-fluid' alt=''/>
									<div className='right-part-sakal-card'>
										<h5 class='card-title'>85 years of Trust</h5>
										<p class='card-text text-18-regular'>Sakal Money has been by your side since decades, and now we are here to help you make the correct financial decisions for you & and your family. </p>
									</div>
								</div>
								<div className='choose-sakal-money-card'>
									<img src={IconThirdSecPersonal} className='img-fluid' />
									<div className='right-part-sakal-card'>
										<h5 class='card-title'>Personal assistance</h5>
										<p class='card-text text-18-regular'>Get a financial advisor to help you and guide you throughout the process. We are always there to understand your queries and resolve them.</p>
									</div>
								</div>
							</div>
							<div className='col-xl-6  col-sm-6 col-lg-6'>
								<div>
								{/* <LoanTypeForm text='testing but in small cases' loanType='Personal Loan'></LoanTypeForm> */}
								<div className="floating-form-section sticky">
									<LoanTypeForm text='testing but in small cases'></LoanTypeForm>
								</div>
									{/* <div className='form-element-button'> */}
									{/* {this.state.authenticated ? ( */}
									{/* // <Link to='/sign-up'> */}
									{/* <Link> */}
									{/* <button className='primary-button apply-now' onClick = {this.checkValidation.bind('a')}>Apply Now</button> */}
									{/* </Link> */}
									{/* ) : ( */}
									{/* <Link> */}
									{/* <button className='primary-button apply-now' onClick = {this.checkValidation.bind('b')}>Apply Now</button> */}
									{/* </Link> */}
									{/* )} */}
									{/* this.context.dispatchCoreAction(setHomeData({ a: 1, b: 2 })) */}
									{/* </div> */}
								</div>
							</div>
						</div>
						<div className='growing-text'>
							<span className='span-growing'>We are growing </span>day by day..
						</div>
					</div>
				</section>
				<section className='fourth-section'>
					<div className='container p-0 fourt-section-bg'>
						<div className='row'>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Lenders} className='img-fluid' alt=''/>
								<div className='counter'>35+</div>
								<div className='counter-name'>Lenders</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Loans} className='img-fluid' alt=''/>
								<div className='counter'>2L+</div>
								<div className='counter-name'>Loans</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Advisors} className='img-fluid' alt=''/>
								<div className='counter'> 1000+</div>
								<div className='counter-name'>Advisors</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Years} className='img-fluid' alt=''/>
								<div className='counter'>87+</div>
								<div className='counter-name'>Years</div>
							</div>
						</div>
					</div>
				</section>
				<section className='fifth-section'>
					<div className='container p-0 '>
						<Slider {...settings}>
							<div className='item first'>
								<img src={Hdbfc} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={HdfcSales} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Hdfc} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Finserv} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Baroda} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Maharashtra} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Aditya} className='img-fluid slider-img' alt=''alt=''/>
							</div>
							<div className='item'>
								<img src={Axis} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Icici} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item'>
								<img src={Federal} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Fullerton} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Gruh} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={IDBI} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Idfc} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Indiabulls} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Indusind} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Lic} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={LT} className='img-fluid slider-img' alt='' />
							</div>
							<div className='item '>
								<img src={Loan} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Magma} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Newgrowth} className='img-fluid slider-img' alt='' />
							</div>
							<div className='item '>
								<img src={Piramal} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Pnb} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Poonawalla} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Rbl} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Sbi} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Standard} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={Tata} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={West} className='img-fluid slider-img' alt=''/>
							</div>
							<div className='item '>
								<img src={YesBank} className='img-fluid slider-img' alt=''/>
							</div>
						</Slider>
					</div>
				</section>
				<section className='sixth-section'>
					<div className='container p-0'>
						<div className='main-heading'>Let’s put an end to your financial problems once in for all</div>

						<div className='form-sec row justify-content-between align-items-center'>
							<div className='col padding'>
								<div className='icon'>
									<svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21'>
										<g fill='none' fill-rule='evenodd' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' transform='translate(3 1.5)'>
											<path d='M8.591 9.49l-3.898 3.898' />
											<circle cx='4.843' cy='9.64' r='1.084' />
											<circle cx='8.383' cy='13.18' r='1.061' />
											<path d='M9.681 5.683c1.667 1.738 3.384 4.098 3.384 6.438 0 3.313-2.906 6.168-6.492 6.168S.081 15.446.081 12.12c0-2.487 1.713-4.685 3.466-6.438M9.155 1.56c.346-.969.359-1.549.359-1.549H3.632s.05.684.338 1.549M9.56 4.416H3.586a.876.876 0 1 1 0-1.753H9.56a.876.876 0 1 1 0 1.753z' />
										</g>
									</svg>
								</div>
							
								<div className='drop-down-section'>
									<button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
										Select
									</button>
									{loan != "" ? (
										<div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
											{loan.loanProductList.map(item => {
												return (
													<a className='dropdown-item text-14-semibold' onClick={() => this.setState({ loanType: item })}>
														{item.loanProductName}
													</a>
												);
											})}
										</div>
									) : null}
								</div>
								
								<div className='error-block'>{this.validator.message("LoanType", this.state.loanType, "required")}</div>
							</div>
							<div className='col padding'>
								<div className='icon'>
									<svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
										<g fill='none' fill-rule='evenodd' stroke='#FFF' stroke-linecap='round' stroke-linejoin='round' transform='translate(2.574 1.05)'>
											<ellipse cx='8.045' cy='4.2' rx='4.291' ry='4.2' />
											<path d='M0 18.522C0 14.461 3.6 10.5 8.045 10.5s8.044 3.96 8.044 8.022' />
										</g>
									</svg>
								</div>
								<div className='indi-form-text'>
									<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ age: e.target.value })} required />
									<label for='age' className='label-name'>
										<span className='content-name'>Age</span>
									</label>
								</div>
								<div className='error-block'>{this.validator.message("age", this.state.age, "required|max:65,num")}</div>
							</div>
							<div className='col padding'>
								<div className='icon'>
									<svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
										<g fill='none' fill-rule='evenodd' stroke='#FFF' stroke-linecap='round' stroke-linejoin='round'>
											<path d='M6.542 4.274h8.567M6.542 7.43h8.567M9.524 4.274s3.088.074 3.088 3.438c0 2.978-3.134 3.052-3.134 3.052H7.556l5.222 5.824' />
										</g>
									</svg>
								</div>
								<div className='indi-form-text '>
									<input type='text' className='' name='addressSecond' value={this.state.loanAmount} onChange={e => this.setState({ loanAmount: e.target.value })} id='addressSecond' autoComplete='off' required />
									<label for='addressSecond' className=' label-name'>
										<span className='content-name'>Loan Amount</span>
									</label>
								</div>
								<div className='error-block'>{this.validator.message("LoanAmount", this.state.loanAmount, "required|min:100000,num")}</div>
							</div>
							<div className='col padding'>
								<div className='icon'>
									<svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
										<g fill='none' fill-rule='evenodd' stroke='#FFF' stroke-linecap='round' stroke-linejoin='round' transform='translate(5.363 1.05)'>
											<path d='M11.584 5.758c0 5.393-5.792 12.55-5.792 12.55S0 11.063 0 5.758C0 2.621 2.6.088 5.792.088c3.192 0 5.792 2.533 5.792 5.67z' />
											<ellipse cx='5.792' cy='5.67' rx='2.832' ry='2.772' />
										</g>
									</svg>
								</div>
								<label for='city' className=' label-name mb-0'>
									<span className='drop-down-name'>City</span>
								</label>
								<VirtualizedSelect placeholder='Select City' options={cityOptions} onChange={city => this.setState({ city })} value={this.state.city} />
								<div className='error-block'>{this.validator.message("City", this.state.city, "required")}</div>
							</div>
							<div className='col btn-col'>
								<button className='primary-button apply-now' onClick={this.checkValidation}>
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</div>
			// </commonContext.Provider>
		);
	}
}

export default Home;
