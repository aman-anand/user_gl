import React, { Component } from "react";

import NotFound from '../../images/undraw-no-data.svg' 
class PageNotFound extends Component {
	render() {
		return (
			<div className='container thank-you-container'>
				<div className='row h-100 justify-content-center align-items-center'>
					<div className='col-md-6 relative'>
						<h2>Oops! The page you were looking for doesn’t exist.</h2>
						<p>You may have mistyped the address or the page may have  been moved.</p>
						<a href='/' className='primary-button mt-3 btn'>Back to home page</a>
					</div>
					<div className='col-md-6'>
						<img src={NotFound} className='img-fluid' />
					</div>
				</div>
			</div>
		);
	}
}

export default PageNotFound;
