import React, { Component } from "react";
import Logo from "../../images/d-wo-1-o-c-3-s-400-x-400.png";
class DashboardNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null
		};
	}

	render() {
		const { nav } = this.props;
		const { userData } = this.state;
		return (
			<div className='navigation '>
				<div className='nav-pannel'>
					<div className='logo'>
					<a href='/'>	<img src={Logo} className='img-fluid' alt='brand-logo' /></a>
					</div>
					<div className='profile-img'>{userData ? (userData.name ? userData.name.toString().charAt(0) : null) : null}</div>
					<div className='profile-name'>{userData ? (userData.name ? userData.name : null) : null}</div>
					<ul className='nav-list list-unstyled tabs'>
						<li className={nav === 1 ? "active" : null}>
							<a href='/dashboard'>
								<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
									<g fill='none' fillRule='evenodd' stroke='#FFF' strokeLinecap='round' strokeLinejoin='round'>
										<path d='M17.327 18.2c0 .571-.467 1.038-1.038 1.038H4.111A1.041 1.041 0 0 1 3.073 18.2V1.88c0-.571.467-1.038 1.038-1.038h12.178c.571 0 1.038.467 1.038 1.038v16.059M5.824 4.448h8.742' />
										<path d='M7 13.21l1.7 1.59 4.3-4M5.824 7.459h8.742' />
									</g>
								</svg>
								My Applications
							</a>
						</li>
						<li className={nav === 2 ? "active" : null}>
							<a href='/dashboard/loans'>
								<svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21'>
									<g fill='none' fillRule='evenodd' stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' transform='translate(3 1.5)'>
										<path d='M8.591 9.49l-3.898 3.898' />
										<circle cx='4.843' cy='9.64' r='1.084' />
										<circle cx='8.383' cy='13.18' r='1.061' />
										<path d='M9.681 5.683c1.667 1.738 3.384 4.098 3.384 6.438 0 3.313-2.906 6.168-6.492 6.168S.081 15.446.081 12.12c0-2.487 1.713-4.685 3.466-6.438M9.155 1.56c.346-.969.359-1.549.359-1.549H3.632s.05.684.338 1.549M9.56 4.416H3.586a.876.876 0 1 1 0-1.753H9.56a.876.876 0 1 1 0 1.753z' />
									</g>
								</svg>
								Loan
							</a>
						</li>
						<li className={nav === 3 ? "active" : null}>
							<a href='/dashboard/profile'>
								<svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21'>
									<g fill='none' fillRule='evenodd' stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' transform='translate(2.52 1.05)'>
										<circle cx='7.875' cy='4.2' r='4.2' />
										<path d='M0 18.522C0 14.461 3.523 10.5 7.875 10.5s7.875 3.96 7.875 8.022' />
									</g>
								</svg>
								Profile
							</a>
						</li>
						<li className={nav === 4 ? "active" : null}>
							<a href='/dashboard/faq'>
								<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
									<g fill='none' fillRule='evenodd' stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' transform='translate(1 1)'>
										<circle cx='8.9' cy='8.9' r='8.86' />
										<path d='M5.7 6.03s.57-2.37 3.46-2.37c3.19 0 3.54 2.98 2.17 4.56-.89 1.02-2.77 2.41-2.77 4.32M8.5 13.96v.18' />
									</g>
								</svg>
								FAQs
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default DashboardNavigation;
