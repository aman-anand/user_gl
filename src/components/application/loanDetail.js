import React, { Component } from "react";
import Nav from "../nav/leftNav";
import $ from "jquery";
import TopNav from "./topNav";
import SimpleReactValidator from "simple-react-validator";
import AxisBankImg from "../../images/Axis-Bank.png";
import { loanApplicationUpdate } from "../../services/loanApplicationUpdate";

class LoanDetail extends Component {
  constructor() {
    super();

    this.state = {
      loanAmoumt: "",
      loanType: "",
      loanPurpose: "",
      loan: ""
    };
    this.validator = new SimpleReactValidator();
  }

  loanType = e => {
    e.preventDefault();
    this.setState({ loanType: e.target.innerHTML });
  };
  loanPurpose = e => {
    e.preventDefault();
    this.setState({ loanPurpose: e.target.innerHTML });
  };

  loan = e => {
    e.preventDefault();
    this.setState({ loan: e.target.innerHTML });
  };

  next = () => {
    if (this.validator.allValid()) {
      let dataString = {
        access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
        loanUuid: '5f0846bb-fb85-4366-bfca-4bf9b9791a84',
        loanAmount: this.state.loanAmoumt,
        interestRate: 0,
        loanTenure: 0
      }

      let loanApplicationUpdateData = loanApplicationUpdate(dataString);
      console.log(loanApplicationUpdateData)

      // window.location.href = "work-details";
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
      <div className="loan-detail">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 p-0">
              <Nav active={2} />
            </div>
            <div className="col-xl-9 rightSec">
              <TopNav />
              {/* form section */}

              <div className="container-fluid form-section">
                <div className="row">
                  <div className="form-heading col-xl-12">
                    <div className="row align-items-center justify-content-between">
                      <div className="col-xl-3 sub-heading  text-16-bold">
                        Loan Details
                      </div>
                    </div>
                  </div>
                  <div className="form-part col-xl-12">
                    <form>
                      <div className="row divide">
                        <div className="col-xl-6 pr-5">
                          <div className="indi-form-text ">
                            <input
                              type="text"
                              className="form-control"
                              name="loanAmount"
                              value={this.state.loanAmount}
                              onChange={e =>
                                this.setState({ loanAmount: e.target.value })
                              }
                              id="loanAmount"
                              autoComplete="off"
                              required
                            />
                            <label
                              for="loanAmount"
                              className="form-label label-name"
                            >
                              <span className="content-name">Loan Amount</span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "loanAmount",
                              this.state.loanAmount,
                              "required|integer"
                            )}
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="drop-down-section">
                            <label for="name" className="label-name  mb-0">
                              <span className="drop-down-name ">Loan Type</span>
                            </label>
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle p-0 text-14-semibold dropdown-button"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Personal loan
                              </button>
                              <div
                                className="dropdown-menu"
                                onClick={this.loanType}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item">Personal loan</a>
                                <a className="dropdown-item">Another action</a>
                                <a className="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "Loan Type",
                              this.state.loanType,
                              "required"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row divide">
                        <div className="col-xl-6 pr-5">
                          <div className="drop-down-section">
                            <label for="name" className="label-name  mb-0">
                              <span className="drop-down-name ">
                                Loan Purpose
                              </span>
                            </label>
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle p-0 text-14-semibold dropdown-button"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Select your option
                              </button>
                              <div
                                className="dropdown-menu"
                                onClick={this.loanPurpose}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item">PERSONAL</a>
                                <a className="dropdown-item">
                                  PURCHASE OF HOME
                                </a>
                                <a className="dropdown-item">
                                  HOME IMPROVEMENT
                                </a>
                                <a className="dropdown-item">WORKING CAPITAL</a>
                                <a className="dropdown-item">
                                  COMMERCIAL PURCHASE
                                </a>
                                <a className="dropdown-item">OTHERS(SPECIFY)</a>
                              </div>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "Loan Purpose",
                              this.state.loanPurpose,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="drop-down-section">
                            <label for="name" className="label-name mb-0">
                              <span className="drop-down-name ">Loan</span>
                            </label>
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle p-0 text-14-semibold dropdown-button"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Select your option
                              </button>
                              <div
                                className="dropdown-menu"
                                onClick={this.loan}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "Loan",
                              this.state.loan,
                              "required"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row divide mt-4">
                        <div className="col-xl-6">
                          <div className="col-xl-12 ">
                            <div className="row align-items-center">
                              <div className="image col-xl-3 p-0">
                                <img
                                  src={AxisBankImg}
                                  alt="Axis-Bank"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="detail col-xl-8 ">
                                <div className="bank-name text-14-semibold">
                                  Axis Bank
                                </div>
                                <div className="rate text-18-bold">
                                  Interest Rate: 14.58%
                                </div>
                                <div className="fee text-14-semibold">
                                  Processing fee: 1.2%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="col-xl-12 ">
                            <div className="row align-items-center">
                              <div className="image col-xl-3 p-0">
                                <img
                                  src={AxisBankImg}
                                  alt="Axis-Bank"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="detail col-xl-8 ">
                                <div className="bank-name text-14-semibold">
                                  Axis Bank
                                </div>
                                <div className="rate text-18-bold">
                                  Interest Rate: 14.58%
                                </div>
                                <div className="fee text-14-semibold">
                                  Processing fee: 1.2%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row divide mt-4">
                        <div className="col-xl-6">
                          <div className="col-xl-12 ">
                            <div className="row align-items-center">
                              <div className="image col-xl-3 p-0">
                                <img
                                  src={AxisBankImg}
                                  alt="Axis-Bank"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="detail col-xl-8 ">
                                <div className="bank-name text-14-semibold">
                                  Axis Bank
                                </div>
                                <div className="rate text-18-bold">
                                  Interest Rate: 14.58%
                                </div>
                                <div className="fee text-14-semibold">
                                  Processing fee: 1.2%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="col-xl-12 ">
                            <div className="row align-items-center">
                              <div className="image col-xl-3 p-0">
                                <img
                                  src={AxisBankImg}
                                  alt="Axis-Bank"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="detail col-xl-8 ">
                                <div className="bank-name text-14-semibold">
                                  Axis Bank
                                </div>
                                <div className="rate text-18-bold">
                                  Interest Rate: 14.58%
                                </div>
                                <div className="fee text-14-semibold">
                                  Processing fee: 1.2%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <footer className="container-fluid">
                        <div className="row justify-content-between align-items-center">
                          <button
                            className="secondary-cta"
                            onClick={() =>
                              (window.location.href = "personal-information")
                            }
                          >
                            BACK
                          </button>
                          <button
                            type="button"
                            className="primary-button"
                            onClick={this.next}
                          >
                            next
                          </button>{" "}
                        </div>
                      </footer>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoanDetail;
