import React, { Component } from "react";
import Logo from "../../images/download.svg";
import StickyLogo from "../../images/sticky-logo.svg";
import $ from "jquery";
import VirtualizedSelect from 'react-virtualized-select'
import SimpleReactValidator from "simple-react-validator";
// Context import
//import { commonContext } from "../../context/conmonContext";
// API
import { loanDropDown, cityList } from "../../services/dropDown";
class FloatingForm extends Component {
   // static contextType = commonContext;
    constructor() {
        super();

        this.state = {
            city: '',
            age: '',
            loanAmount: '',
            loanType: '',
            authenticated: "",
			loan: "",
			accessToken: "qweriewosidjc",
			cityOptions: []


        };
        this.validator = new SimpleReactValidator();


    }
   
    apply = () => {
        this.validator.showMessages();
           this.forceUpdate();
    };
    loanType=(e)=>{
        e.preventDefault();
        this.setState({loanType: e.target.innerHTML})
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
	}
	// updateValue = () => {
	// 	console.log("Came to Updated Value");
	// 	console.log(this.state.accessToken);
	// 	this.setState({
	// 		accessToken: 'mynameisshubham123',
	// 	}, () => {
	// 		console.log(this.state.accessToken)
	// 	})
	// }
	cityList = () => {
		cityList()
			.then(res => res.data)
			.then(data => {
				if (data.code === "200") {
					let tempHold = [];
					data.cityList.map((value, key) => {
						tempHold.push({ label: value.name, value: value.name });
					});
					this.setState({
						cityOptions: tempHold
					});
				}
			})
			.catch(err => alert(err));
	};
	render() {
		// const routePathApp = this.state.route;
		const { loan, cityOptions } = this.state;
        $(document).on('click', '.dropdown-menu .dropdown-item', function () {
            let value = $(this).text()
            $(this)
                .parent('.dropdown-menu')
                .siblings('.dropdown-button')
                .text(value);

        });

        return (
          
            <form>
            <h3 className='text-20-bold'>Let’s keep you going!</h3>
            <p className='text-16-regular'>Help us understand a few details before we can get started.</p>
            <div className='form-element'>
                <div className='icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21'>
                        <g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' transform='translate(3 1.5)'>
                            <path d='M8.591 9.49l-3.898 3.898' />
                            <circle cx='4.843' cy='9.64' r='1.084' />
                            <circle cx='8.383' cy='13.18' r='1.061' />
                            <path d='M9.681 5.683c1.667 1.738 3.384 4.098 3.384 6.438 0 3.313-2.906 6.168-6.492 6.168S.081 15.446.081 12.12c0-2.487 1.713-4.685 3.466-6.438M9.155 1.56c.346-.969.359-1.549.359-1.549H3.632s.05.684.338 1.549M9.56 4.416H3.586a.876.876 0 1 1 0-1.753H9.56a.876.876 0 1 1 0 1.753z' />
                        </g>
                    </svg>
                </div>
                <div className='drop-down-section'>
                    <label for='name' className='label-name mb-0'>
                        <span className='drop-down-name '>Loan</span>
                    </label>
                    <div className='dropdown'>
                        <button className='btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown ' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onChange={e => this.setState({ marital: e.target.value })}>
                            Select your Loan Type
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
                </div>
                <div className='error-block'>{this.validator.message("loanType", this.state.loanType, "required")}</div>
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
                        <span className='content-name'>Age</span>
                    </label>
                </div>
                <div className='error-block'>{this.validator.message("age", this.state.age, "required|integer")}</div>
            </div>

            <div className='form-element'>
                <div className='icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
                        <g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round'>
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
                <div className='error-block'>{this.validator.message("loanAmount", this.state.loanAmount, "required|integer")}</div>
            </div>
            <div className='form-element'>
                <div className='icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='21' viewBox='0 0 22 21'>
                        <g fill='none' fill-rule='evenodd' stroke='#707070' stroke-linecap='round' stroke-linejoin='round' transform='translate(5.363 1.05)'>
                            <path d='M11.584 5.758c0 5.393-5.792 12.55-5.792 12.55S0 11.063 0 5.758C0 2.621 2.6.088 5.792.088c3.192 0 5.792 2.533 5.792 5.67z' />
                            <ellipse cx='5.792' cy='5.67' rx='2.832' ry='2.772' />
                        </g>
                    </svg>
                </div>
                <label for='city' className=' label-name mb-0'>
                    <span className='drop-down-name'>City</span>
                </label>
                <VirtualizedSelect
                    placeholder='Select City'
                    options={cityOptions}
                    onChange={city => this.setState({ city })}
                    // onChange={this.cityHandler}
                    value={this.state.city}
                />
                <div className='error-block'>{this.validator.message("city", this.state.city, "required")}</div>
            </div>

            <div className='form-element-button'>
                <button type='button' className='primary-button apply-now' onClick={this.submitForm}>
                    Apply Now
                </button>
            </div>
        </form>
           
        );
    }
}

export default FloatingForm;
