import React, { Component } from "react";

import $ from "jquery";

import Nav from "../nav/leftNav";
import TopNav from "./topNav";
import SimpleReactValidator from "simple-react-validator";
import { profileUpdate } from "../../services/profileUpdate";


class bankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      accountType: ""
    };
    this.validator = new SimpleReactValidator();
  }

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  bankName = e => {
    e.preventDefault();
    this.setState({ bankName: e.target.innerHTML });
  };

  accountType = e => {
    e.preventDefault();
    this.setState({ accountType: e.target.innerHTML });
  };

  next = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      // window.location.href = "other-details";
      let dataString = {
				access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
        firstName: this.state.accountHolderName,
        virtualAccountNumber: this.state.accountNumber,
        virtualAccountBank: this.state.bankName,
			  }
		
			  let profileUpdateData = profileUpdate(dataString);
			  console.log(profileUpdateData)
    } else this.validator.showMessages();
    this.forceUpdate();
  };

  render() {
    $(document).on("click", ".dropdown-menu .dropdown-item", function() {
      let value = $(this).text();
      $(this)
        .parent(".dropdown-menu")
        .siblings(".dropdown-button")
        .text(value);
    });
    return (
      <div className="bankDetails">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-xl-3 p-0">
              <Nav active={4} />
            </div>
            <div className="col-xl-9 rightSec">
              <TopNav />
              {/* Form Section */}
              <div className="container-fluid form-section">
                <div className="row">
                  <div className="col-xl-12 formHeader">
                    <div className="row  align-items-center justify-content-between">
                      <div className="col-xl-3 text-16-bold">Bank Details</div>
                      {/* <div className='col-xl-6'></div> */}
                      <div className="col-xl-3 text-12-semibold">
                        All fields are mandatory
                      </div>
                    </div>
                  </div>
                </div>
                <div className="formPart">
                  <div className="row accName">
                    <div className="col-xl-4">
                      <div className="indi-form-text ">
                        <input
                          type="tel"
                          className="form-control"
                          name="accountHolderName"
                          id="accountHolderName"
                          onChange={this.inputHandler}
                          autoComplete="off"
                          required
                        />
                        <label
                          for="accountHolderName"
                          className="form-label label-name"
                        >
                          <span className="content-name">
                            Account holder name
                          </span>
                        </label>
                      </div>
                      <div className="error-block">
                        {this.validator.message(
                          "Account holder name",
                          this.state.accountHolderName,
                          "required|alpha_space"
                        )}
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="indi-form-text ">
                        <input
                          type="tel"
                          className="form-control"
                          name="accountNumber"
                          id="accountNumber"
                          onChange={this.inputHandler}
                          autoComplete="off"
                          required
                        />
                        <label
                          for="employerType"
                          className="form-label label-name"
                        >
                          <span className="content-name">Account Number</span>
                        </label>
                      </div>
                      <div className="error-block">
                        {this.validator.message(
                          "Account Number",
                          this.state.accountNumber,
                          "required|integer"
                        )}
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="drop-down-section">
                        <label for="name" className="label-name ">
                          <span className="drop-down-name ">Bank Name</span>
                        </label>
                        <div className="dropdown">
                          <button
                            className="btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown "
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Select Bank Name
                          </button>
                          <div
                            className="dropdown-menu"
                            onClick={this.bankName}
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item text-14-semibold">
                              Axis Bank
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              HDFC Bank
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              Bank of Maharashtra
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              State Bank of India
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <div className='indi-form-text '>
										<input type='tel' className='form-control' name='bankName' id='bankName' onChange={this.inputHandler} autoComplete='off' required />
										<label for='bankName' className='form-label label-name'>
										<span className='content-name'>Bank Name (Dropdown)</span>
										</label>
									</div> */}
                      <div className="error-block">
                        {this.validator.message(
                          "Bank Name",
                          this.state.bankName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row rowPadding">
                    <div className="col-xl-4">
                      <div className="indi-form-text ">
                        <input
                          type="tel"
                          className="form-control"
                          name="ifscCode"
                          id="ifscCode"
                          onChange={this.inputHandler}
                          autoComplete="off"
                          required
                        />
                        <label for="ifscCode" className="form-label label-name">
                          <span className="content-name">IFSC CODE</span>
                        </label>
                      </div>
                      <div className="error-block">
                        {this.validator.message(
                          "Designation",
                          this.state.ifscCode,
                          "required|alpha_num"
                        )}
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="drop-down-section">
                        <label for="name" className="label-name ">
                          <span className="drop-down-name ">Account Type</span>
                        </label>
                        <div className="dropdown">
                          <button
                            className="btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown "
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Select Account Type
                          </button>
                          <div
                            className="dropdown-menu"
                            onClick={this.accountType}
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item text-14-semibold">
                              Savings
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              Current
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              Cash
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              Credit
                            </a>
                            <a className="dropdown-item text-14-semibold">
                              Others
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <div className='indi-form-text '>
                                        <input type='tel' className='form-control' name='accountType' id='accountType' onChange={this.inputHandler} autoComplete='off' required />
                                        <label for='accountType' className='form-label label-name'>
                                        <span className='content-name'>Account Type (Dropdown)</span>
                                        </label>
                                    </div> */}
                      <div className="error-block">
                        {this.validator.message(
                          "Account Type",
                          this.state.accountType,
                          "required|alpha_space"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="row justify-content-between">
                  <button
                    className="secondary-cta"
                    onClick={() => (window.location.href = "work-details")}
                  >
                    back
                  </button>
                  <button className="primary-button" onClick={this.next}>
                    next
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default bankDetails;
