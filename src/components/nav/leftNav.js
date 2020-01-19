import React, { Component } from "react";
import Check from "../../images/check-big.svg";

import ContinueLaterModal from "../application/Modals/continueLaterModal";

import DocumentUploadPopup from "../application/Modals/documentUploadModal";
import logo from "../../images/download.svg";
import { Link } from "react-router-dom";

// import exitPopUpImg from '../../images/sx-5-le-99-ex.png';
// import documentUploadImg from '../../images/document-upload.svg';

class leftNav extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='left-Nav'>
				
					
					<img src={logo} className='logo' />
			
				<ul class='steps'>
					<li class={this.props.active == 1 && "active"}>
						<a href='personal-information'>
							<div class='title'>
								{this.props.active == 1 && <span class='step-number text-14-semibold'>1</span>}
								{this.props.active > 1 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Personal Information</span>
							</div>
						</a>
					</li>

					<li class={this.props.active == 2 && "active"}>
						<a href='loan-detail'>
							<div class='title'>
								{this.props.active < 3 && <span class='step-number text-14-semibold'>2</span>}
								{this.props.active > 2 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Loan Details</span>
							</div>
						</a>
					</li>
					<li class={this.props.active == 3 && "active"}>
						<a href='work-details'>
							<div class='title'>
								{this.props.active < 4 && <span class='step-number text-14-semibold'>3</span>}
								{this.props.active > 3 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Work Details</span>
							</div>
						</a>
					</li>
					<li class={this.props.active == 4 && "active"}>
						<a href='bank-details'>
							<div class='title'>
								{this.props.active < 5 && <span class='step-number text-14-semibold'>4</span>}
								{this.props.active > 4 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Bank Details</span>
							</div>
						</a>
					</li>
					<li class={this.props.active == 5 && "active"}>
						<a href='other-details'>
							<div class='title'>
								{this.props.active < 6 && <span class='step-number text-14-semibold'>5</span>}
								{this.props.active > 5 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Other Details</span>
							</div>
						</a>
					</li>
					<li class={this.props.active == 6 && "active"}>
						<a href='#'>
							<div class='title' data-toggle='modal' data-target='#document'>
								{this.props.active < 7 && <span class='step-number text-14-semibold'>6</span>}
								{this.props.active > 6 && <img src={Check} className='img-fluid checkedd' alt='status icon' />}
								<span class='step-text '>Documents</span>
							</div>
						</a>
					</li>
				</ul>

				<div class='continue' data-toggle='modal' data-target='#continueLaterModal'>
					<a className=''>CONTINUE LATER</a>
				</div>

				{/* <!-- Continue Later Modal   --> */}

				<ContinueLaterModal />

				{/* <!-- Document Upload Modal-> */}

				<DocumentUploadPopup />
			</div>
		);
	}
}

export default leftNav;
