import React, { Component } from "react";
import "./loan-type-form.scss";
import VirtualizedSelect from "react-virtualized-select";
import SimpleReactValidator from "simple-react-validator";
import { loanDropDown, cityList } from "../../../services/dropDown";

class LoanTypeForm extends Component {
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
			cityOptions: [],
			propLoanType: { loanProductList: [] }
		};
		this.validator = new SimpleReactValidator();
	}
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
		this.loanTypeSetupFunc();
	}

	loanTypeSetupFunc = e => {
		let loanTypeStaticData = "";
		if (this.props.loanType === undefined) {
			this.setState({
				propLoanType: this.state.loan
			});
		} else {
			if (this.state.loan.loanProductList) {
				for (let i = 0; i < this.state.loan.loanProductList.length; i++) {
					// console.log(loan.loanProductList[i].name)
					if (this.props.loanType == this.state.loan.loanProductList[i].name) {
						this.state.propLoanType.loanProductList.push(this.state.loan.loanProductList[i]);
						loanTypeStaticData = this.state.propLoanType.loanProductList;
					}
				}
			}
		}
		console.log(this.state.propLoanType);
		loanTypeStaticData = loanTypeStaticData[0];
		console.log(loanTypeStaticData);
		this.setLoanTypeFunc(loanTypeStaticData);
	};

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

	checkValidation = e => {
		// if (this.validator.allValid()) {
		// 	const userData = {
		// 		city: this.state.city,
		// 		age: this.state.age,
		// 		loanAmount: this.state.loanAmount,
		// 		loanType: this.state.loanType
		// 	};
		// 	// debugger
		// 	sessionStorage.setItem("userData", JSON.stringify(userData));
		// 	window.location.pathname = "/sign-up";
		// } else {
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// }
		// this.props.history.push('dashboard')
			window.location.pathname = "/dashboard";
	};
	setLoanTypeFunc = e => {
		this.setState({
			loanType: e
		});
	};
	render() {
		let loanTypeStaticData = "";
		console.log(this.state.loanType);
		// let propLoanType = {loanProductList:[]};
		const { loan, cityOptions } = this.state;
		return (
			<>
				<div>
					<h3 className='text-20-bold'>Please Sign In</h3>
					<div className='form-element'>
						<div className='icon'>
							<svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
								<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' transform='translate(2.574 1.05)'>
									<ellipse cx='8.045' cy='4.2' rx='4.291' ry='4.2' />
									<path d='M0 18.522C0 14.461 3.6 10.5 8.045 10.5s8.044 3.96 8.044 8.022' />
								</g>
							</svg>
						</div>
						<div className='indi-form-text'>
							<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ age: e.target.value })} required />
							<label for='age' className='label-name'>
								<span className='content-name'>Username</span>
							</label>
						</div>
					</div>
					<div className='form-element'>
						<div className='icon'>
							<svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
								<g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' transform='translate(2.574 1.05)'>
									<ellipse cx='8.045' cy='4.2' rx='4.291' ry='4.2' />
									<path d='M0 18.522C0 14.461 3.6 10.5 8.045 10.5s8.044 3.96 8.044 8.022' />
								</g>
							</svg>
						</div>
						<div className='indi-form-text'>
							<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ age: e.target.value })} required />
							<label for='age' className='label-name'>
								<span className='content-name'>Password</span>
							</label>
						</div>
					</div>
					<div className='form-element-button'>
						<button className='primary-button apply-now' onClick={this.checkValidation}>
							Apply Now
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default LoanTypeForm;
