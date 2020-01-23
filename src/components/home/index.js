import React, { Component } from "react";
import axios from "axios";

import qs from "querystring";
import $ from "jquery";
import Header from "../headerFooter/header";
import Footer from "../headerFooter/footer";
import SimpleReactValidator from "simple-react-validator";
import './landing.scss';

// API
import { loanDropDown, cityList } from "../../services/dropDown";

import FloatingForm from "./floatingForm";

import "react-select/dist/react-select.css";
import VirtualizedSelect from "react-virtualized-select";
import Slider from "react-slick";
import { Link } from "react-router-dom";
//slider images

import PersonalBanner from "../../images/home2.jpg";
// import CarBanner from "../../images/car.png";
import CarBanner from "../../images/home1.jpg";
import HomeBanner from "../../images/home4.jpg";
import BusinessBanner from "../../images/home3.jpg";

// Context import
// import commonContext from "../../context/conmonContext";


import { CoreStateContext } from "../../context/core";
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
			<div>
				<Header active={1} />

				<section className='banner-section  p-0'>
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
							<h5>Welcome to Geden Lines Training Portal. <br/>We will provide</h5>
							<Slider {...contentSetting} asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}>
								<div className='content-item '>
									<h3>&nbsp;Employee Courses</h3>
								</div>
								<div className='content-item '>
									<h3>&nbsp;Course Test</h3>
								</div>
								<div className='content-item'>
									<h3>&nbsp;Progress Report</h3>
								</div>
								<div className='content-item'>
									<h3>&nbsp;Course Certificate</h3>
								</div>
							</Slider>
							<p>The whole learning will be so immense that everyone loves it !</p>
						</div>
					</div>
					<div className='overlay-section'></div>
				{/* secion second start */}
				<section className='first-section'></section>
				<div className='col-xl-6  col-sm-6 col-lg-6'>
								<div>
								<div className="floating-form-section sticky">
									<LoanTypeForm text='testing but in small cases'></LoanTypeForm>
								</div>
								</div>
							</div>
				</section>
			</div>
		);
	}
}

export default Home;
