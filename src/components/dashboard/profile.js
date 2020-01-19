import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";

// API
import { fetchUserDetails, profileUpdate } from "../../services/userData";
class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: "",
			name: "",
			email: ""
		};
	}
	componentDidMount() {
		this.fetchUserData();
	}

	// Get user data to prefill the data
	fetchUserData = () => {
		let datastring = {
			access_token: "e555348a-731d-441c-a092-3764a5cd9f1a"
		};
		fetchUserDetails(datastring)
			.then(res => res.data)
			.then(data =>
				this.setState({
					userData: data.borrowerDetail,
					name: data.borrowerDetail.fullName,
					email: data.borrowerDetail.emailAddress
				})
			)
			.catch(err => alert(err.message));
	};

	updateProfile = () => {
		const name = this.state.name.split(" ");

		let datastring = {
			access_token: "e555348a-731d-441c-a092-3764a5cd9f1a",
			emailAddress: this.state.email,
			firstName: name[0] ? name[0] : null,
			lastName: name.length > 2 ? name[2] : name[1],
			middleName: name.length > 2 ? name[1] : null
		};
		profileUpdate(datastring)
			.then(res => res.data)
			.then(data => {
				if (data.code === "200") {
					this.fetchUserData();

				}
			})
			.catch(err => alert(err.message));
	};

	render() {
		const { userData, name, email } = this.state;
		return (
			<React.Fragment>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xl-2 pl-0'>
							<Navigation nav={3} />
						</div>
						<div className='col-xl-10 profile'>
							<h1>My profile</h1>
							<div className='row'>
								<div className='col-xl-6'>
									<article>
										<header>
											Personal information
											<button data-toggle='modal' data-target='#profile-update'>
												<svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'>
													<path fill='#6A6A6A' fill-rule='nonzero' d='M6.84 1.836l2.238 2.248-5.664 5.692-2.237-2.248L6.84 1.836zm3.936-.543L9.778.291a.987.987 0 0 0-1.4 0l-.955.96L9.661 3.5l1.115-1.12c.299-.301.299-.786 0-1.087zM.006 10.688c-.04.184.125.35.308.305l2.494-.608L.57 8.136l-.565 2.552z' />
												</svg>
											</button>
										</header>
										<hr />
										{userData ? (
											<section>
												<label>Name</label>
												<p>{userData.fullName}</p>
												<label>Number</label>
												<p>{`${userData.mobileNumberCountryCode}-${userData.mobileNumber}`}</p>
												<label>Email</label>
												<p>{userData.emailAddress}</p>
											</section>
										) : null}
									</article>
								</div>
								{userData && userData.virtualAccountBank ? (
									<div className='col-xl-6'>
										<article>
											<header>Bank details</header>
											<hr />

											<section>
												<label>Account holder name</label>
												<p>{userData.virtualAccountName}</p>

												<label>Bank name</label>
												<p>{userData.virtualAccountBank}</p>
												<label>Account number</label>
												<p>{userData.virtualAccountNumber}</p>
												<label>IFSC</label>
												<p>{userData.ifsc}</p>
											</section>
										</article>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<div className='modal fade profile-update' id='profile-update' tabindex='-1' role='dialog' aria-hidden='true'>
					<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
						<div className='modal-content'>
							<div className='modal-body'>
								<div className='conatiner-fluid'>
									<h5>Personal information</h5>
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
									<div className='col-md-6'>
										<div class='indi-form-text'>
											<input type='text' class='' name='name' id='name' autocomplete='off' required='' value={name} onChange={event => this.setState({ name: event.target.value })} />
											<label for='name' class=' label-name'>
												<span class='content-name'>Name</span>
											</label>
										</div>
										<div class='indi-form-text mt-4'>
											<input type='text' class='' name='name' id='email' autocomplete='off' required='' value={email} onChange={event => this.setState({ email: event.target.value })} />
											<label for='name' class=' label-name'>
												<span class='content-name'>Email</span>
											</label>
										</div>
									</div>

									<footer className='row justify-content-between'>
										<button className='secondary-cta m-4'>back</button>
										<button className='primary-button m-4'  data-dismiss='modal' onClick={this.updateProfile}>
											Save
										</button>
									</footer>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Profile;
