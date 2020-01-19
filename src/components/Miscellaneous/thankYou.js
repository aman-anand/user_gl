import React, { Component } from "react";

import Illu from "../../images/undraw-startup-life-2-du-2.svg";

class ThankYou extends Component {
	render() {
		const userData= sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null
		return (
			<div className='container thank-you-container'>
				<div className='row h-100 justify-content-center align-items-center'>
					<div className='col-md-6'>
						<h2>Thankyou {userData?userData.name:null}, for using our services!</h2>
						<p>Someone from our team will get back to you soon.</p>
					</div>
					<div className='col-md-6'>
						<img src={Illu} className='img-fluid'/>
					</div>
				</div>
			</div>
		);
	}
}

export default ThankYou;
