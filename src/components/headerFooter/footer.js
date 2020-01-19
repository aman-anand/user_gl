import React, { Component } from "react";
import Logo from "../../images/download.svg";

class HomeFooter extends Component {
	render() {
		return (
			<footer>
				<div className="footer-first-part">
					<div className="container p-0">
						<div className="still-que">Still have questions?</div>
						<div className="contactno">Give us a missed call here at +91-9323-44-2345</div>
					</div>
				</div>
				<div className="footer-sec-part">
					<div className="container ">
						<div className="row  justify-content-between align-items-start ">
							<div className=" first-sec">
								<h3 className="text-18-bold mb-0">Address</h3>
								<div className="address">Sakal Money, 82/1A & 83/1A,Baner Road, behind Sakal Nagar, Aundh,Pune, Maharashtra 411007</div>
								<a href="https://www.google.com/maps/place/Sakal+Edu/@18.547393,73.819199,18z/data=!4m8!1m2!2m1!1sSakal+Money,+82%2F1A+%26+83%2F1A,Baner+Road,+behind+Sakal+Nagar,+Aundh,Pune,+Maharashtra+411007!3m4!1s0x3bc2bf6ae6aaaaab:0xec58a86027a78d86!8m2!3d18.5471748!4d73.8202184" className="direction-link text-14-bold">GET DIRECTIONS</a>
							</div>
							<div className=" second-sec">
								<h3 className="text-18-bold mb-0">Our Products</h3>
								<ul>
									<li><a href="/loan/home-loan">Home Loan</a></li>
									<li><a href="/loan/personal-loan">Personal Loan</a></li>
									<li><a href="/loan/car-loan">Car Loan</a></li>
									<li><a href="/loan/business-loan">Business Loan</a></li>
								</ul>
							</div>
							<div className="">
								<h3 className="text-18-bold mb-0">Other Offerings</h3>

								<ul>
									<li><a href="/home-loan">Insurance</a></li>
									<li><a href="#">Mutual Funds</a></li>
									<li><a href="#">Partner login</a></li>

								</ul>
							</div>
							<div className="">
								<img src={Logo} className="img-fluid" />
							</div>
						</div>
					</div>

				</div>
				<div className="footer-third-part">
					<div className="container p-0 footer-container justify-content-between align-items-center">
						<div className="copy">
							Copyrights @ 2019 Sakal Money. All rights reserved.
				</div>
						<ul className="page-links list-unstyled tag-list">

							<li><a href="#">Terms of use</a></li>
							<li><a href="https://www.sakalmoney.com/static/privacy-policy.aspx"> Privacy Policy</a></li>
							<li><a href="#">Disclaimer</a></li>
							<li><a href="links">Useful links</a></li>

						</ul>
					</div>

				</div>
			</footer>
		);
	}
}

export default HomeFooter;
