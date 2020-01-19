import React, { Component } from "react";
import $ from "jquery";
import Header from "../headerFooter/header";
import Footer from "../headerFooter/footer";
import Faq from "./faqHomePage";
import FloatingForm from "./floatingForm";

import Banner from "../../images/personal.png";

import Lenders from "../../images/35-lenders.svg";
import IconThirdSec from "../../images/Sakal icons1.svg";
import CardSec1 from "../../images/Group 21.svg";
import "react-select/dist/react-select.css";
import VirtualizedSelect from "react-virtualized-select";
import Slider from "react-slick";
import LoanTypeForm from '../../components/common/loan-type-form/loan-type-form';
import Loans from "../../images/2-l-loans.svg";
import Advisors from "../../images/500-advisors.svg";
import Years from "../../images/85-years.svg";

//slider images

//bank logo slider
import Hdbfc from "../../images/hdb fc.png";
import HdfcSales from "../../images/hdfc sales.png";
import Hdfc from "../../images/hdfc.png";
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
//personal loan icon
import FaqIcon from "../../images/group.svg";

class BusinessLoan extends Component {
	constructor() {
		super();

		this.state = {
			city: "",
			nav1: null,
			nav2: null
		};
	}
	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		});
	}
	render() {
		const options = [
			{ label: "Navi Mumbai", value: 1 },
			{ label: "Mumbai", value: 2 },
			{ label: "Nashik", value: 3 }
			// And so on...
		];
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
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 1000,
			className: "slider-for"
			//	asNavFor: '.slider-nav'
		};
		var contentSetting = {
			dots: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			arrows: false,
			autoplaySpeed: 2000,
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
			<div>
				<Header active={2} />
				<section className='banner-business-loan-section '>
					{/* <Slider {...banner}
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}

                    >
                        <div className='item '>
                            <img src={Banner} class="" />
                        </div>
                        <div className='item '>
                            <img src={Banner} class="" />
                        </div>
                        <div className='item'>
                            <img src={Banner} class="" />
                        </div>
                        <div className='item'>
                            <img src={Banner} class="" />
                        </div>


                    </Slider> */}

					<div className='container p-0'>
						<div className='row align-items-end'>
							<div class='col-xl-6 col-sm-6 col-lg-6 content'>
								<h3 className='mb-0'>Business loan,</h3>

								<p>Accelerating growth for you,with you.</p>
							</div>
							<div className='col-xl-6 col-sm-6 col-lg-6'>
								{/* <FloatingForm /> */}
								<div className='floating-form-section-loan'>
									<LoanTypeForm text='testing but in small cases' loanType='Business Loan'></LoanTypeForm>
								</div>

							</div>
						</div>
					</div>
					<div className='overlay-loan-section'></div>
					{/* secion second start */}
					<section className='first-loan-section'></section>
				</section>

				<section className='second-loan-section'>
					<div className='container p-0'>
						<div className='main-heading'>
							<span className='span-heading'>Benefits</span>
						</div>
						<div className='row'>
							<div className='col-xl-4  col-sm-4 col-lg-4'>
								<div className='benifit-part align-items-center'>
									<div className='icon'>
										<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'>
											<g fill='none' fill-rule='evenodd'>
												<circle cx='44.88' cy='44.978' r='44.88' fill='#E2E2FD' fill-rule='nonzero' />
												<path fill='#C1C1EA' fill-rule='nonzero' d='M51.532 21.64c-.167-1.615-1.212-4.67-4.068-5.894-2.508-1.088-5.37-.388-8.51 2.04-6.26 4.834-10.107 9.181-9.933 15.906.066 2.428.258 8.18.465 14.27.203 6.013.414 12.233.479 14.784l.083 3.096 14.172-.363.439-2.49c7.037-39.694 6.924-40.812 6.873-41.35z' />
												<path fill='#3C3AC4' fill-rule='nonzero' d='M41.073 41.454l-.08-27.254a1.702 1.702 0 0 1 1.695-1.705l18.799-.055a1.698 1.698 0 0 1 1.705 1.695l.08 27.254a1.698 1.698 0 0 1-1.695 1.706l-18.798.054a1.698 1.698 0 0 1-1.706-1.695' />
												<path fill='#726EFB' fill-rule='nonzero' d='M57.28 39.451a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
												<path d='M54.755 20.918l.011 3.168M54.751 18.802l-.011-3.172' />
												<path fill='#C1C1EA' fill-rule='nonzero' d='M38.054 38.392l2.99 2.504 2.762-1.11-.287-10.96s-.428-5.662 3.727-5.77c4.156-.11 4.021 5.57 4.021 5.57l.302 11.613c.859 3.1 1.323 6.295 1.382 9.511.145 5.575-4.239 11.537-7.922 11.613-3.683.077-7.175.425-7.175.425' />
												<path fill='#726EFB' fill-rule='nonzero' d='M46.452 71.383l.047-5.211a2.178 2.178 0 0 0-2.156-2.2l-15.46-.17a2.177 2.177 0 0 0-2.202 2.16l-.044 5.21a2.178 2.178 0 0 0 2.156 2.2l15.456.17a2.177 2.177 0 0 0 2.203-2.159z' />
												<path fill='#615EEE' fill-rule='nonzero' d='M26.637 69.859a2.177 2.177 0 0 1 2.178-2.12l6.169.055 12.832.152a2.177 2.177 0 0 1 2.152 2.243L49.82 75.4a2.177 2.177 0 0 1-2.202 2.116l-18.98-.203a2.177 2.177 0 0 1-2.156-2.243l.156-5.211z' />
												<rect width='6.224' height='7.806' x='53.855' y='16.04' fill='#FFB23D' fill-rule='nonzero' rx='2.13' />
												<path fill='#C1C1EA' fill-rule='nonzero' d='M57.28 35.677a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
												<path fill='#E2E2FD' fill-rule='nonzero' d='M57.263 33.463a2.972 2.972 0 0 0-2.316 1.089 2.994 2.994 0 0 0 4.649 0 2.987 2.987 0 0 0-2.333-1.089z' />
											</g>
										</svg>
									</div>
									<div className='content'>Need a heading</div>
								</div>
								<p className='text-18-regular'>Pocket-friendly repayment</p>
							</div>
							<div className='col-xl-4  col-sm-4 col-lg-4'>
								<div className='benifit-part align-items-center'>
									<div className='icon'>
										<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'>
											<g fill='none' fill-rule='evenodd'>
												<circle cx='44.951' cy='45.144' r='44.885' fill='#E2E2FD' fill-rule='nonzero' />
												<path fill='#615EEE' fill-rule='nonzero' d='M54 28.731c-10.328 0-18.7 8.373-18.7 18.7 0 10.329 8.372 18.701 18.7 18.701s18.7-8.372 18.7-18.7a18.697 18.697 0 0 0-18.7-18.7zm0 33.284c-8.054 0-14.583-6.53-14.583-14.583 0-8.054 6.529-14.584 14.583-14.584s14.583 6.53 14.583 14.584c0 8.054-6.529 14.583-14.583 14.583z' />
												<path fill='#615EEE' fill-rule='nonzero' d='M54 28.731c-.894 0-1.786.064-2.67.193a18.69 18.69 0 0 1 12.815 8.035 14.58 14.58 0 0 1 0 20.945 18.684 18.684 0 0 1-12.819 8.038c.885.127 1.777.19 2.67.19a18.7 18.7 0 1 0 0-37.397L54 28.73z' />
												<path fill='#726EFB' fill-rule='nonzero' d='M54.01 32.835L43.269 22.85l4.104-6.11H60.65l4.104 6.11z' />
												<path fill='#8A8AF9' fill-rule='nonzero' d='M43.269 22.85l4.104-6.11H60.65l4.104 6.11z' />
												<path fill='#8A8AF9' fill-rule='nonzero' d='M54.01 32.835L50.7 22.85h6.637z' opacity='.8' />
												<path fill='#726EFB' fill-rule='nonzero' d='M50.698 22.85l-3.319-6.113h6.637z' />
												<path fill='#726EFB' fill-rule='nonzero' d='M57.332 22.85l-3.319-6.113h6.637z' />
												<path fill='#FFB23D' fill-rule='nonzero' d='M44.87 60.716c0 3.213-6.196 5.819-13.838 5.819-7.642 0-13.837-2.619-13.837-5.82v-4.751h27.674v4.758-.006z' />
												<ellipse cx='31.032' cy='55.954' fill='#FFC885' fill-rule='nonzero' rx='13.837' ry='5.816' />
												<path fill='#FFB23D' fill-rule='nonzero' d='M44.87 54.936c0 3.214-6.196 5.819-13.838 5.819-7.642 0-13.837-2.618-13.837-5.819v-4.759h27.674v4.759z' />
												<ellipse cx='31.032' cy='50.181' fill='#FFC885' fill-rule='nonzero' rx='13.837' ry='5.816' />
												<path fill='#FFB23D' fill-rule='nonzero' d='M44.87 49.156c0 3.214-6.196 5.82-13.838 5.82-7.642 0-13.837-2.619-13.837-5.82v-4.758h27.674v4.758z' />
												<ellipse cx='31.032' cy='44.401' fill='#FFC885' fill-rule='nonzero' rx='13.837' ry='5.816' />
												<path fill='#FFB23D' fill-rule='nonzero' d='M44.87 43.377c0 3.214-6.196 5.819-13.838 5.819-7.642 0-13.837-2.619-13.837-5.82v-4.758h27.674v4.759z' />
												<ellipse cx='31.032' cy='38.618' fill='#FFC885' fill-rule='nonzero' rx='13.837' ry='5.816' />
												<path fill='#FFDEB6' fill-rule='nonzero' d='M31.032 33.938c-6.67 0-12.076 2.095-12.076 4.68 0 2.586 5.406 4.683 12.076 4.683 6.67 0 12.076-2.097 12.076-4.683 0-2.585-5.41-4.68-12.076-4.68zm0 8.837c-5.93.006-10.741-1.866-10.741-4.157 0-2.29 4.804-4.16 10.734-4.16s10.735 1.863 10.735 4.16c0 2.298-4.801 4.163-10.728 4.163v-.006z' />
												<path stroke='#3C3AC4' stroke-linecap='round' stroke-linejoin='round' stroke-width='4' d='M18.524 26.869l52.245 46.682' />
											</g>
										</svg>
									</div>
									<div className='content'>Need a heading</div>
								</div>
								<p className='text-18-regular'>No need to provide collaterals against the loan</p>
							</div>
							<div className='col-xl-4  col-sm-4 col-lg-4'>
								<div className='benifit-part align-items-center'>
									<div className='icon'>
										<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'>
											<g fill='none' fill-rule='nonzero'>
												<ellipse cx='45.101' cy='44.98' fill='#E2E2FD' rx='44.885' ry='44.723' />
												<path fill='#C1C1EA' d='M66.11 36.74l-9.05-9.023v36.16h12.11v-19.81c-.002-2.75-1.103-5.387-3.06-7.327z' />
												<path fill='#615EEE' d='M26.107 57.287l-6.83-17.674a3.429 3.429 0 0 1 .07-2.639 3.448 3.448 0 0 1 1.926-1.812l32.25-12.391a3.46 3.46 0 0 1 4.466 1.972l6.811 17.69a3.436 3.436 0 0 1-1.964 4.452l-32.25 12.391a3.47 3.47 0 0 1-2.654-.066 3.452 3.452 0 0 1-1.825-1.923z' />
												<path fill='#726EFB' d='M60.437 31.128L21.77 46.063l2.573 6.659 38.67-14.929z' />
												<path fill='#3C3AC4' d='M19.044 38.945v-18.94a3.45 3.45 0 0 1 3.456-3.443h34.56a3.45 3.45 0 0 1 3.456 3.443v18.94c0 .913-.363 1.79-1.011 2.437a3.462 3.462 0 0 1-2.445 1.01H22.5a3.462 3.462 0 0 1-2.445-1.01 3.437 3.437 0 0 1-1.011-2.437z' />
												<path fill='#C1C1EA' d='M23.364 35.501h1.728c.477 0 .864.386.864.861s-.387.86-.864.86h-1.728a.862.862 0 0 1-.864-.86c0-.475.387-.86.864-.86zM28.892 35.501h1.73c.478 0 .865.386.865.861s-.387.86-.864.86h-1.731a.862.862 0 0 1-.861-.86c0-.474.385-.86.86-.86z' />
												<path fill='#726EFB' d='M54.468 20.005h1.728v2.583h-1.728zM51.012 20.005h1.728v2.583h-1.728zM47.556 20.005h1.728v2.583h-1.728z' />
												<path fill='#FFB23D' d='M22.5 25.516v-4.134c0-.76.618-1.377 1.381-1.377h4.15c.763 0 1.381.617 1.381 1.377v4.134c0 .76-.618 1.376-1.381 1.376h-4.14a1.384 1.384 0 0 1-.983-.4 1.374 1.374 0 0 1-.408-.976z' />
												<path fill='#C1C1EA' d='M51.055 38.107a3.753 3.753 0 0 0-3.595-1.045c-1.3.317-2.33 1.3-2.705 2.58a3.72 3.72 0 0 0 .89 3.623l7.082 7.7a21.954 21.954 0 0 0 .13 11.715c.04.066.066.13.106.193l.628 1.004h11.232V51.812L51.055 38.107z' />
												<path fill='#615EEE' d='M52.861 62.876H69.9a1.237 1.237 0 0 1 1.26 1.223v8.08a1.242 1.242 0 0 1-1.26 1.22H52.86a1.245 1.245 0 0 1-1.263-1.22V64.1a1.245 1.245 0 0 1 1.263-1.223z' />
												<ellipse cx='66.014' cy='68.993' fill='#C1C1EA' rx='1.188' ry='1.184' />
											</g>
										</svg>
									</div>
									<div className='content'>Need a heading</div>
								</div>
								<p className='text-18-regular'>Easier to Manage Than Multiple Credit Card Accounts</p>
							</div>
						</div>
					</div>
				</section>
				{/* secion second end */}
				{/* secion third start */}
				<section className='third-loan-section'>
					<div className='container p-0'>
						<div className='main-heading'>
							<span className='span-heading'>Testimonials</span>{" "}
						</div>
						<div className='row'>
							<div className=' col-xl-6 col-lg-6 col-sm-6'>
								<div className='testimonial-card'>
									<div className='testimonial-icon'>
										<svg xmlns='http://www.w3.org/2000/svg' width='71' height='58' viewBox='0 0 71 58'>
											<g fill='#4A46A3' fill-rule='nonzero'>
												<path d='M0 29.043v28.5h29v-28.5H12.429c0-8.993 7.42-16.285 16.571-16.285V.543c-16.018 0-29 12.76-29 28.5zM71 12.758V.543c-16.017 0-29 12.76-29 28.5v28.5h29v-28.5H54.429c0-8.993 7.42-16.285 16.571-16.285z' opacity='.173' />
												<path d='M28 34.272v13.271h13.588V34.272h-7.764c0-4.188 3.476-7.584 7.764-7.584V21C34.083 21 28 26.942 28 34.272zM61 26.688V21c-7.505 0-13.588 5.942-13.588 13.272v13.271H61V34.272h-7.765c0-4.188 3.477-7.584 7.765-7.584z' />
											</g>
										</svg>
									</div>
									<div className='testimonial-sec align-items-center'>
										<div className=''>
											<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'>
												<g fill='none' fill-rule='evenodd'>
													<circle cx='44.88' cy='44.978' r='44.88' fill='#E2E2FD' fill-rule='nonzero' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M51.532 21.64c-.167-1.615-1.212-4.67-4.068-5.894-2.508-1.088-5.37-.388-8.51 2.04-6.26 4.834-10.107 9.181-9.933 15.906.066 2.428.258 8.18.465 14.27.203 6.013.414 12.233.479 14.784l.083 3.096 14.172-.363.439-2.49c7.037-39.694 6.924-40.812 6.873-41.35z' />
													<path fill='#3C3AC4' fill-rule='nonzero' d='M41.073 41.454l-.08-27.254a1.702 1.702 0 0 1 1.695-1.705l18.799-.055a1.698 1.698 0 0 1 1.705 1.695l.08 27.254a1.698 1.698 0 0 1-1.695 1.706l-18.798.054a1.698 1.698 0 0 1-1.706-1.695' />
													<path fill='#726EFB' fill-rule='nonzero' d='M57.28 39.451a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
													<path d='M54.755 20.918l.011 3.168M54.751 18.802l-.011-3.172' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M38.054 38.392l2.99 2.504 2.762-1.11-.287-10.96s-.428-5.662 3.727-5.77c4.156-.11 4.021 5.57 4.021 5.57l.302 11.613c.859 3.1 1.323 6.295 1.382 9.511.145 5.575-4.239 11.537-7.922 11.613-3.683.077-7.175.425-7.175.425' />
													<path fill='#726EFB' fill-rule='nonzero' d='M46.452 71.383l.047-5.211a2.178 2.178 0 0 0-2.156-2.2l-15.46-.17a2.177 2.177 0 0 0-2.202 2.16l-.044 5.21a2.178 2.178 0 0 0 2.156 2.2l15.456.17a2.177 2.177 0 0 0 2.203-2.159z' />
													<path fill='#615EEE' fill-rule='nonzero' d='M26.637 69.859a2.177 2.177 0 0 1 2.178-2.12l6.169.055 12.832.152a2.177 2.177 0 0 1 2.152 2.243L49.82 75.4a2.177 2.177 0 0 1-2.202 2.116l-18.98-.203a2.177 2.177 0 0 1-2.156-2.243l.156-5.211z' />
													<rect width='6.224' height='7.806' x='53.855' y='16.04' fill='#FFB23D' fill-rule='nonzero' rx='2.13' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M57.28 35.677a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
													<path fill='#E2E2FD' fill-rule='nonzero' d='M57.263 33.463a2.972 2.972 0 0 0-2.316 1.089 2.994 2.994 0 0 0 4.649 0 2.987 2.987 0 0 0-2.333-1.089z' />
												</g>
											</svg>
										</div>
										<p className='text-18-regular'>“With Sakal money it was easier for me to compare and avail the facilities sooner in easier an way with their assistance”</p>
									</div>
									<div className='testimonial-name text-24-semibold'>- Ankita Dalvi</div>
								</div>
							</div>
							<div className='col-xl-6 col-lg-6 col-sm-6'>
								<div className='testimonial-card'>
									<div className='testimonial-icon'>
										<svg xmlns='http://www.w3.org/2000/svg' width='71' height='58' viewBox='0 0 71 58'>
											<g fill='#4A46A3' fill-rule='nonzero'>
												<path d='M0 29.043v28.5h29v-28.5H12.429c0-8.993 7.42-16.285 16.571-16.285V.543c-16.018 0-29 12.76-29 28.5zM71 12.758V.543c-16.017 0-29 12.76-29 28.5v28.5h29v-28.5H54.429c0-8.993 7.42-16.285 16.571-16.285z' opacity='.173' />
												<path d='M28 34.272v13.271h13.588V34.272h-7.764c0-4.188 3.476-7.584 7.764-7.584V21C34.083 21 28 26.942 28 34.272zM61 26.688V21c-7.505 0-13.588 5.942-13.588 13.272v13.271H61V34.272h-7.765c0-4.188 3.477-7.584 7.765-7.584z' />
											</g>
										</svg>
									</div>
									<div className='testimonial-sec align-items-center'>
										<div className=''>
											<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'>
												<g fill='none' fill-rule='evenodd'>
													<circle cx='44.88' cy='44.978' r='44.88' fill='#E2E2FD' fill-rule='nonzero' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M51.532 21.64c-.167-1.615-1.212-4.67-4.068-5.894-2.508-1.088-5.37-.388-8.51 2.04-6.26 4.834-10.107 9.181-9.933 15.906.066 2.428.258 8.18.465 14.27.203 6.013.414 12.233.479 14.784l.083 3.096 14.172-.363.439-2.49c7.037-39.694 6.924-40.812 6.873-41.35z' />
													<path fill='#3C3AC4' fill-rule='nonzero' d='M41.073 41.454l-.08-27.254a1.702 1.702 0 0 1 1.695-1.705l18.799-.055a1.698 1.698 0 0 1 1.705 1.695l.08 27.254a1.698 1.698 0 0 1-1.695 1.706l-18.798.054a1.698 1.698 0 0 1-1.706-1.695' />
													<path fill='#726EFB' fill-rule='nonzero' d='M57.28 39.451a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
													<path d='M54.755 20.918l.011 3.168M54.751 18.802l-.011-3.172' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M38.054 38.392l2.99 2.504 2.762-1.11-.287-10.96s-.428-5.662 3.727-5.77c4.156-.11 4.021 5.57 4.021 5.57l.302 11.613c.859 3.1 1.323 6.295 1.382 9.511.145 5.575-4.239 11.537-7.922 11.613-3.683.077-7.175.425-7.175.425' />
													<path fill='#726EFB' fill-rule='nonzero' d='M46.452 71.383l.047-5.211a2.178 2.178 0 0 0-2.156-2.2l-15.46-.17a2.177 2.177 0 0 0-2.202 2.16l-.044 5.21a2.178 2.178 0 0 0 2.156 2.2l15.456.17a2.177 2.177 0 0 0 2.203-2.159z' />
													<path fill='#615EEE' fill-rule='nonzero' d='M26.637 69.859a2.177 2.177 0 0 1 2.178-2.12l6.169.055 12.832.152a2.177 2.177 0 0 1 2.152 2.243L49.82 75.4a2.177 2.177 0 0 1-2.202 2.116l-18.98-.203a2.177 2.177 0 0 1-2.156-2.243l.156-5.211z' />
													<rect width='6.224' height='7.806' x='53.855' y='16.04' fill='#FFB23D' fill-rule='nonzero' rx='2.13' />
													<path fill='#C1C1EA' fill-rule='nonzero' d='M57.28 35.677a2.994 2.994 0 1 1-.021-5.988 2.994 2.994 0 0 1 .022 5.988' />
													<path fill='#E2E2FD' fill-rule='nonzero' d='M57.263 33.463a2.972 2.972 0 0 0-2.316 1.089 2.994 2.994 0 0 0 4.649 0 2.987 2.987 0 0 0-2.333-1.089z' />
												</g>
											</svg>
										</div>
										<p className='text-18-regular'>““Sakal money gave me prompt service & unbiased advice. They helped me finding the best option for me, I have recommended to all my friends””</p>
									</div>
									<div className='testimonial-name text-24-semibold'>- Himanshu Parida</div>
								</div>
							</div>
						</div>
						<div className='growing-text'>
							<span className='span-growing'>We are growing </span>day by day..
						</div>
					</div>
				</section>
				<section className='fourth-loan-section'>
					<div className='container p-0 fourt-section-bg'>
						<div className='row'>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Lenders} className='img-fluid' alt=''/>
								<div className='counter'>35+</div>
								<div className='counter-name'>Lenders</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Loans} className='img-fluid' />
								<div className='counter'>2L+</div>
								<div className='counter-name'>Loans</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Advisors} className='img-fluid' />
								<div className='counter'> 1000+</div>
								<div className='counter-name'>Advisors</div>
							</div>
							<div className='col-xl-3  col-sm-3 col-lg-3 counter-part'>
								<img src={Years} className='img-fluid' />
								<div className='counter'>87+</div>
								<div className='counter-name'>Years</div>
							</div>
						</div>
					</div>
				</section>
				<section className='fifth-loan-section'>
					<div className='container p-0 '>
						<Slider {...settings}>
						<div className='item first'>
								<img src={Hdbfc} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={HdfcSales} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item'>
								<img src={Hdfc} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item'>
								<img src={Finserv} className="img-fluid slider-img" alt="" />
							</div>
							<div className='item'>
								<img src={Baroda} className="img-fluid slider-img" alt="" />
							</div>
							<div className='item'>
								<img src={Maharashtra} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item'>
								<img src={Aditya} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item'>
								<img src={Axis} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Icici} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item'>
								<img src={Federal} className="img-fluid slider-img" alt="" />
							</div>
							<div className='item '>
								<img src={Fullerton} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Gruh} className="img-fluid slider-img" alt="" />
							</div>
							<div className='item '>
								<img src={IDBI} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Idfc} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Indiabulls} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Indusind} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Lic} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={LT} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Loan} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Magma} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Newgrowth} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Piramal} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Pnb} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Poonawalla} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Rbl} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Sbi} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Standard} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={Tata} className="img-fluid slider-img" alt="" />
							</div>
							<div className='item '>
								<img src={West} className="img-fluid slider-img" alt=""/>
							</div>
							<div className='item '>
								<img src={YesBank} className="img-fluid slider-img" alt=""/>
							</div>
						</Slider>
					</div>
				</section>
				<section className='sixth-loan-section'>
					<div className='container p-0'>
						<div className='main-heading'>Frequently Asked Questions</div>
						<div className='row'>
							<div className='col-xl-6'>
								<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingOne'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='false' aria-controls='collapseOne'>
													Why should I take a business loan
												</a>
											</h4>
										</div>
										<div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>
											<div class='panel-body'>Mobilizing money for smooth business operation is critical for any business. An unsecured business loan gives you access to credit, which can be repaid over a period of time. It can be used for expansion of an existing business or investing in a new one without pledging anything against the borrowed amount.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingTwo'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
													Who can avail of a business loan?
												</a>
											</h4>
										</div>
										<div id='collapseTwo' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>
											<div class='panel-body p-2'>
												<ul>
													<li>Self-employed individuals/ professionals (like doctors, architects, chartered accountants, business consultants)</li>
													<li> Sole proprietorship firms</li>
													<li> Partnership firms</li>
													<li> Private limited companies</li>
													<li> Closely held and public limited companies</li>
												</ul>
											</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingThree'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>
													What is the eligibility criteria for availing of a business loan?
												</a>
											</h4>
										</div>
										<div id='collapseThree' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingThree'>
											<div class='panel-body'>
												Your firm should be at least 3 years old. <br />
												For a net income of up to Rs. 1.5 lakhs, a firm can avail loan of up to Rs. 15 lakhs.
												<br />
												The above figures are only indicative, the actual eligibility criteria varies across financial institutions.
											</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingFour'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseFour' aria-expanded='false' aria-controls='collapseFour'>
													What is the loan processing time?
												</a>
											</h4>
										</div>
										<div id='collapseFour' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingFour'>
											<div class='panel-body'>Typically, 5 working days after all documents are submitted.</div>
										</div>
									</div>

									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingFive'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseFive' aria-expanded='false' aria-controls='collapseFive'>
													What is the loan amount one can avail?
												</a>
											</h4>
										</div>
										<div id='collapseFive' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingFive'>
											<div class='panel-body'>An unsecured business loan ranges from Rs. 10 lakhs up to Rs. 1.25 cr depending upon the financial eligibility.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingSix'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseSix' aria-expanded='false' aria-controls='collapseSix'>
													How do I pay the EMI?
												</a>
											</h4>
										</div>
										<div id='collapseSix' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingSix'>
											<div class='panel-body'>For monthly payments, banks may request for an Electronic Clearing System (ECS) form to be signed by you linking your salary or operational account. Besides ECS, at the time of applying for the loan, banks may ask you to submit post-dated cheques.  Do clarify your ECS debit date with the bank so you can ensure sufficient balance for payment clearance.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingSeven'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseSeven' aria-expanded='false' aria-controls='collapseSeven'>
													Can I pre-pay my loan?
												</a>
											</h4>
										</div>
										<div id='collapseSeven' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingSeven'>
											<div class='panel-body'>Yes, but most financial institutions allow part pay after 6 months from the date of disbursement.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingEight'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseEight' aria-expanded='false' aria-controls='collapseEight'>
													Will I be charged by SAKAL MONEY for services offered?
												</a>
											</h4>
										</div>
										<div id='collapseEight' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingEight'>
											<div class='panel-body'>No. The services offered by SAKAL MONEY are completely free of charge.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingNine'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseNine' aria-expanded='false' aria-controls='collapseNine'>
													I submitted my application to SAKAL MONEY. Now, what next?
												</a>
											</h4>
										</div>
										<div id='collapseNine' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingNine'>
											<div class='panel-body'>Once your application has been received, it will be securely sent to the financial institution of your choice. We will be in touch with you throughout the disbursement process.</div>
										</div>
									</div>
									<div class='panel panel-default'>
										<div class='panel-heading' role='tab' id='headingTen'>
											<h4 class='panel-title'>
												<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseTen' aria-expanded='false' aria-controls='collapseTen'>
													What if my application is rejected?
												</a>
											</h4>
										</div>
										<div id='collapseTen' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTen'>
											<div class='panel-body'>In an unlikely scenario of rejection, we will help you rectify the shortcoming and re-process the application.</div>
										</div>
									</div>
								</div>
								<div className='viewall'>
									<a href='/faq'>view all</a>
								</div>
							</div>
							<div className='col-xl-6 p-0 image-sec'>
								<img src={FaqIcon} />
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</div>
		);
	}
}

export default BusinessLoan;
