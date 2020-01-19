import React, { Component } from "react";
import Nav from "../nav/leftNav";
import $ from "jquery";
import TopNav from "./topNav";
import SimpleReactValidator from "simple-react-validator";
import InputMask from "react-input-mask";
import { otherDetailsAddCoApplicant } from "../../services/otherDetails";
import { otherDetailsAddReference } from "../../services/otherDetails";
class OtherDetails extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      mobileNo: "",
      reletionship: "",
      applicant: null,
      referace: null,
      reletionshipRef: "",
      emailReferance: "",
      firstname: "",
      lastname: "",
      dateOfBirthRef: "",
      coApplicantFirstName: "",
      coApplicantLastName: "",
    };
    this.validator = new SimpleReactValidator();
  }
  callingCoApplicantService = () => {
    if(this.validator.allValid()){
      let dataString = {
        access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
        loanUuid: "1b7b5f38-c0d3-401e-993e-3f3a3195ef91",
        coApplicantDetails: {
            city: "Mumbai",
            firstName: "sasdtrinasdag",
            lastName: "sasdasdtring",
            mobileNumber: "4567897890"
        }
    }
      // let dataString = {
      //   access_token: '7d6e364f-6ce9-407d-bf4e-c2c666b86e27',
      //   loanUuid: '1b7b5f38-c0d3-401e-993e-3f3a3195ef91',
      //   coApplicantDetails: {
      //     firstName: this.state.coApplicantFirstName,
      //     lastName: this.state.coApplicantLastName,
      //     title: 'test',
      //     mobileNumber: this.state.mobileNo,
      //     dateOfBirth: this.state.dateOfBirth,
      //     relationshipStatus: this.state.reletionship,
      //     city: 'Mumbai',
      //     state: 'Maharashtra',
      //     zipCode: '410210',
      //     emailId: this.state.email
      //   }
      //   }
        console.log(dataString)
        let otherDetailsCoApplicantData = otherDetailsAddCoApplicant(dataString);
        console.log(otherDetailsCoApplicantData)
    }
    else{
      console.log('Checking all validation for 1 and 2')
    this.validator.showMessageFor("name");
    this.validator.showMessageFor("email");
    this.validator.showMessageFor("Mobile No.");
    this.validator.showMessageFor("Date of Birth");
    this.validator.showMessageFor("Reletionship With Borrower");
    this.forceUpdate();
    }
  }
  next = () => {
    if (this.state.applicant == 1) {
      if(this.validator.fieldValid('name')){
        const nameToArray = this.state.name.split(' ')
        const lengthOfName = nameToArray.length
        const lName = lengthOfName>1? nameToArray[lengthOfName-1]: ''
        const fName = this.state.name.replace(lName, '')
        this.setState({
          coApplicantFirstName: fName,
          coApplicantLastName: lName,
        }, () => {this.callingCoApplicantService()})
      }
    }
    if (this.state.referace == 1) {
      if(this.validator.allValid()){
        let dataString = {
          access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
          loanUuid: '1b7b5f38-c0d3-401e-993e-3f3a3195ef91',
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          userName: '9975085339',
          relationshipStatus: this.state.reletionshipRef,
          mobileNumber: this.state.mobileNo,
          dateOfBirth: this.state.dateOfBirth,
          relationshipStatus: this.state.reletionship,
          referenceUrl: 'createReference'
          }
          console.log(dataString)
          let otherDetailsCoApplicantData = otherDetailsAddReference(dataString);
          otherDetailsCoApplicantData.then(res => {
            console.log(res)
          })
          console.log(otherDetailsCoApplicantData)
      }
      else{
        console.log('All fields are not valid or filled')
      }
      this.validator.showMessageFor("First Name");
      this.validator.showMessageFor("Last Name");
      this.validator.showMessageFor("Email");
      this.validator.showMessageFor("dateofbirth");
      this.validator.showMessageFor("Relationshipwithborrower");
      this.forceUpdate();
    }
  };
  render() {
    return (
      <div className="other-details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 p-0">
              <Nav active={5} />
            </div>
            <div className="col-xl-9 rightSec">
              <TopNav />
              {/* form section */}

              <div className="container-fluid form-section">
                <div className="row">
                  <div className="form-heading col-xl-12">
                    <div className="row align-items-center justify-content-between">
                      <div className="col-xl-3 sub-heading  text-16-bold">
                        Other Details
                      </div>
                    </div>
                  </div>
                  <div className="form-part col-xl-12">
                      <div className="row">
                        <div className=" col-xl-12">
                          <label>Do you have a co-applicant?</label>
                          <div className="radio-area">
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="applicant"
                                value="Yes"
                                onClick={() => {
                                  this.setState({ applicant: 1 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>Yes</label>
                            </div>
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="applicant"
                                value="No"
                                onClick={() => {
                                  this.setState({ applicant: 2 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>No</label>
                            </div>
                          </div>

                          {/* <div className='error-block'>{this.validator.message("applicant", this.state.applicant, "required|integer")}</div> */}
                        </div>
                      </div>

                      {this.state.applicant == 1 ? (
                        <div>
                          <div className="row divide">
                            <div className=" col-xl-4 padding">
                              <div className="indi-form-text">
                                <input
                                  type="text"
                                  className=""
                                  name="name"
                                  value={this.state.name}
                                  onChange={e =>
                                    this.setState({ name: e.target.value })
                                  }
                                  id="name"
                                  autoComplete="off"
                                  required
                                />
                                <label for="name" className=" label-name">
                                  <span className="content-name">Name</span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "name",
                                  this.state.name,
                                  "required|alpha_space"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className=""
                                  name="Email"
                                  id="Email"
                                  value={this.state.email}
                                  onChange={e =>
                                    this.setState({ email: e.target.value })
                                  }
                                  autoComplete="off"
                                  required
                                />
                                <label for="Email" className=" label-name">
                                  <span className="content-name">Email</span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "email",
                                  this.state.email,
                                  "required|email"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="mobileNo"
                                  value={this.state.mobileNo}
                                  onChange={e =>
                                    this.setState({ mobileNo: e.target.value })
                                  }
                                  id="mobileNo"
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="mobileNo"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">
                                    Mobile number
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Mobile No.",
                                  this.state.mobileNo,
                                  "required|phone"
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row divide">
                            <div className=" col-xl-4 padding">
                              <div className="indi-form-text ">
                                <InputMask
                                  type="text"
                                  className="form-control"
                                  id="dateOfBirth"
                                  name="dateOfBirth"
                                  mask="99/99/9999"
                                  value={this.state.dateOfBirth}
                                  onChange={e =>
                                    this.setState({
                                      dateOfBirth: e.target.value
                                    })
                                  }
                                  maskChar=" "
                                  required
                                />

                                {/* <input type='text' className='form-control' name='date' id='date' autoComplete='off'  onfocus="(this.type='date')" onfocusout="(this.type='text')"  required /> */}
                                <label
                                  for="dateOfBirth"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">
                                    Date of birth (DD/MM/YYYY)
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Date of Birth",
                                  this.state.dateOfBirth,
                                  "required"
                                )}
                              </div>
                            </div>
                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className=""
                                  name="reletionship"
                                  id="reletionship"
                                  value={this.state.reletionship}
                                  onChange={e =>
                                    this.setState({
                                      reletionship: e.target.value
                                    })
                                  }
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="reletionship"
                                  className=" label-name"
                                >
                                  <span className="content-name">
                                    Relationship with borrower
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Reletionship With Borrower",
                                  this.state.reletionship,
                                  "required|alpha"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <div className="personal-address-label text-16-bold">
                        <div className="col-xl-12 line"></div>
                      </div>

                      <div className="row">
                        <div className=" col-xl-12">
                          <label>Do you have a reference?</label>
                          <div className="radio-area">
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="referace"
                                value="Yes"
                                onClick={() => {
                                  this.setState({ referace: 1 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>Yes</label>
                            </div>
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="referace"
                                value="No"
                                onClick={() => {
                                  this.setState({ referace: 2 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>No</label>
                            </div>
                          </div>

                          {/* <div className='error-block'>{this.validator.message("referace", this.state.referace, "required|integer")}</div> */}
                        </div>
                      </div>

                      {this.state.referace == 1 ? (
                        <div>
                          <div className="row divide">
                            <div className=" col-xl-4 padding">
                              <div className="indi-form-text">
                                <input
                                  type="text"
                                  className=""
                                  name="firstname"
                                  value={this.state.firstname}
                                  onChange={e =>
                                    this.setState({ firstname: e.target.value })
                                  }
                                  id="firstname"
                                  autoComplete="off"
                                  required
                                />
                                <label for="firstname" className=" label-name">
                                  <span className="content-name">
                                    First Name
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "First Name",
                                  this.state.firstname,
                                  "required|alpha"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className=""
                                  name="lastname"
                                  id="lastname"
                                  value={this.state.lastname}
                                  onChange={e =>
                                    this.setState({ lastname: e.target.value })
                                  }
                                  autoComplete="off"
                                  required
                                />
                                <label for="lastname" className=" label-name">
                                  <span className="content-name">
                                    Last Name
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Last Name",
                                  this.state.lastname,
                                  "required|alpha"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="emailReferance"
                                  value={this.state.emailReferance}
                                  onChange={e =>
                                    this.setState({
                                      emailReferance: e.target.value
                                    })
                                  }
                                  id="emailReferance"
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="emailReferance"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">Email</span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Email",
                                  this.state.emailReferance,
                                  "required|email"
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row divide">
                            <div className=" col-xl-4 padding">
                              <div className="indi-form-text ">
                                <InputMask
                                  type="text"
                                  className="form-control"
                                  id="dateOfBirthRef"
                                  name="dateOfBirthRef"
                                  mask="99/99/9999"
                                  value={this.state.dateOfBirthRef}
                                  onChange={e =>
                                    this.setState({
                                      dateOfBirthRef: e.target.value
                                    })
                                  }
                                  maskChar=" "
                                  required
                                />

                                {/* <input type='text' className='form-control' name='date' id='date' autoComplete='off'  onfocus="(this.type='date')" onfocusout="(this.type='text')"  required /> */}
                                <label
                                  for="dateOfBirthRef"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">
                                    Date of birth (DD/MM/YYYY)
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "dateofbirth",
                                  this.state.dateOfBirthRef,
                                  "required"
                                )}
                              </div>
                            </div>
                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className=""
                                  name="reletionshipRef"
                                  id="reletionshipRef"
                                  value={this.state.reletionshipRef}
                                  onChange={e =>
                                    this.setState({
                                      reletionshipRef: e.target.value
                                    })
                                  }
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="reletionshipRef"
                                  className=" label-name"
                                >
                                  <span className="content-name">
                                    Relationship with borrower
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Relationshipwithborrower",
                                  this.state.reletionshipRef,
                                  "required|alpha"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <footer className="container-fluid">
                        <div className="row justify-content-between align-items-center">
                          <button
                            type="button"
                            className="secondary-cta"
                            onClick={() =>
                              (window.location.href = "bank-details")
                            }
                          >
                            back
                          </button>
                          <button
                            className="primary-button"
                            onClick={this.next}
                          >
                            next
                          </button>
                        </div>
                      </footer>
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

export default OtherDetails;
