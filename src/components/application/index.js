import React, { Component } from "react";
import Nav from "../nav/leftNav";
import $ from "jquery";
import TopNav from "./topNav";
import SimpleReactValidator from "simple-react-validator";
import InputMask from "react-input-mask";
import "react-select/dist/react-select.css";
// import 'react-virtualized/styles.css'
//import 'react-virtualized-select/styles.css'
import VirtualizedSelect from "react-virtualized-select";
import { personalProfileUpdate } from "../../services/personalProfileUpdate";
import { loanDropDown, cityList } from "../../services/dropDown";


class PersonalLoan extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      name: "",
      fatherName: "",
      email: "",
      profession: "",
      gender: null,
      genderText: "",
      dateOfBirth: "",
      panNumber: "",
      adharNumber: "",
      addressFirst: "",
      addressSecond: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      dependent: "",
      addressFirstMail: "",
      addressSecondMail: "",
      landmarkMail: "",
      pincodeMail: "",
      cityMail: "",
      stateMail: "",
      marital: "",
      residenceType: "",
      cityOptions: ""
    };
    this.validator = new SimpleReactValidator();
    this.handleChange = this.handleChange.bind(this);
  }

  changedTheVal = () => {
    this.setState({
      addressFirstMail: this.state.addressFirst,
      addressSecondMail: this.state.addressSecond,
      landmarkMail: this.state.landmark,
      cityMail: this.state.city,
      stateMail: this.state.state,
      pincodeMail: this.state.pincode,
    }, () => {
      this.setState({
        checked: !this.state.checked,
      });
    })
  }
  componentDidMount(){
		this.cityList();
	}
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
  // changeCity = (e) => {
  //   console.log('City is working')
  //   console.log(e.target)
  // }

  handleChange() {
    this.changedTheVal();
  }
  marital = e => {
    e.preventDefault();
    this.setState({ marital: e.target.innerHTML });
  };
  residenceType = e => {
    e.preventDefault();
    this.setState({ residenceType: e.target.innerHTML });
  };
  profileUpdateService = () => {
    console.log(this.state.city)
    if (this.validator.allValid()) {
      console.log(this.validator.fieldValid('City'))
      let dataString = {
          access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
          // grossIncome: 12122,
          // monthlyEmiOnOutstandingLoans: 0,
          residenceType: this.state.residenceType,
          // residentOwnershipType: this.state.residenceType,
          city: this.state.city.label,
          state: this.state.city.state,
          zipCode: this.state.pincode,
          // livingSince: '1999',
          // ownershipType: this.state.ownershipType,
          addressOneLine1: this.state.addressFirst,
          // addressOneCity: this.state.city,
          // addressOneState: this.state.state,
          addressOneZipCode: this.state.pincode,
          // addressOneLivingSince: '1999',
          // addressOneOwnershipType: 'OWN',
          addressTwoLine1: this.state.addressSecond,
          firstName: this.state.name,
          gender: this.state.genderText,
          maritalStatus: this.state.marital,
          // mobileNumber: '7057884436',
          dateOfBirth: this.state.dateOfBirth,
          fatherFullName: this.state.fatherName,
          fatherFirstName: this.state.fatherName,
          husbandFullName: this.state.fatherName,
          husbandFirstName: this.state.fatherName,
      };
      let personalProfileUpdateData = personalProfileUpdate(dataString);
      console.log(personalProfileUpdateData)
      personalProfileUpdateData.then(res => {
        console.log(res);
        if(res.data.code === '200'){
          this.props.history.push("loan-detail")
        }
        else{
          alert(res.data.message)
        }
      })
        // personalProfileUpdateData = personalProfileUpdateData.data;
        // console.log(JSON.stringify(personalProfileUpdateData));
        // if (personalProfileUpdateData.code === '200') {
          // console.log("API called Successfully")
          // sessionStorage.setItem("userData", JSON.stringify({ access_token: personalProfileUpdateData.access_token, name: self.state.name, phone: self.state.phone }));
          // self.setState({ userStep: self.state.userStep + 1 });
        // } else if (personalProfileUpdateData.code === "400") {
          // console.log("Error calling API")
          // window.location.href = "/sign-in";
        // }
      // window.location.href = "loan-detail";
    } else{
      this.validator.showMessages();
      this.forceUpdate();
    }
    if (!this.state.checked) {
      this.validator.showMessageFor("address First");
      this.validator.showMessageFor("address Second");
      this.validator.showMessageFor("Landmark");
      this.validator.showMessageFor("City");
      this.validator.showMessageFor("State");
      this.validator.showMessageFor("Pincode");
      this.forceUpdate();
    }
  }
  next = () => {
    const self = this;
    console.log("Calling");  
    console.log(this.validator.allValid())
    if(this.state.gender === 1){
      this.setState({
        genderText: 'Male'
      }, () => {
        this.profileUpdateService()
      })
    }
    if(this.state.gender === 2){
      this.setState({
        genderText: 'Female'
      }, () => {
        this.profileUpdateService()
      })
    }
    if(this.state.gender === 3){
      this.setState({
        genderText: 'Other'
      }, () => {
        this.profileUpdateService()
      })
    }
  };
  render() {
    // const options = [
    //   { label: "One", value: 1 },
    //   { label: "Two", value: 2 },
    //   { label: "Three", value: 3 }
    //   // And so on...
    // ];
    const StateOptions = [
      { label: "One2", value: 1 },
      { label: "Two2", value: 2 },
      { label: "Three2", value: 3 }
      // And so on...
    ];
    const options = this.state.cityOptions;

    $(document).on("click", ".dropdown-menu .dropdown-item", function() {
      let value = $(this).text();
      $(this)
        .parent(".dropdown-menu")
        .siblings(".dropdown-button")
        .text(value);
    });

    return (
      <div className="personal-loan">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 p-0">
              <Nav active={1} />
            </div>
            <div className="col-xl-9 rightSec">
              <TopNav />
              {/* form section */}

              <div className="container-fluid form-section">
                <div className="row">
                  <div className="form-heading col-xl-12">
                    <div className="row align-items-center justify-content-between">
                      <div className="col-xl-3 sub-heading  text-16-bold">
                        Personal information
                      </div>
                      <div className="col-xl-3 right-text text-12-semibold">
                        All fields are mandatory
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
                              name="name"
                              value={this.state.name}
                              onChange={e =>
                                this.setState({ name: e.target.value })
                              }
                              id="name"
                              autoComplete="off"
                              required
                            />
                            <label for="name" className="form-label label-name">
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
                        <div className="col-xl-6">
                          <div className="indi-form-text">
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.fatherName}
                              onChange={e =>
                                this.setState({ fatherName: e.target.value })
                              }
                              name="father-name"
                              id="father-name"
                              autoComplete="off"
                              required
                            />
                            <label
                              for="father-name"
                              className="form-label label-name"
                            >
                              <span className="content-name">
                                Father/Husband Name
                              </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "father-name",
                              this.state.fatherName,
                              "required|alpha_space"
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row divide">
                        <div className="col-xl-6 pr-5">
                          <div className="indi-form-text">
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                              autoComplete="off"
                              required
                            />
                            <label for="name" className=" label-name">
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
                        <div className=" col-xl-6">
                          <label>Gender</label>
                          <div className="radio-area">
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onClick={() => {
                                  this.setState({ gender: 1 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>Male</label>
                            </div>
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onClick={() => {
                                  this.setState({ gender: 2 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>Female</label>
                            </div>
                            <div className="custom-radios">
                              <input
                                type="radio"
                                name="gender"
                                value="Other"
                                onClick={() => {
                                  this.setState({ gender: 3 });
                                }}
                              />
                              <div className="custom-check"></div>
                              <label>Other</label>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "gender",
                              this.state.gender,
                              "required|integer"
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row divide">
                        <div className="col-xl-6 pr-5">
                          <div className="indi-form-text ">
                            <input
                              type="text"
                              className=""
                              name="profession"
                              id="profession"
                              value={this.state.profession}
                              onChange={e =>
                                this.setState({ profession: e.target.value })
                              }
                              autoComplete="off"
                              required
                            />
                            <label for="profession" className=" label-name">
                              <span className="content-name">Profession</span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "profession",
                              this.state.profession,
                              "required|alpha_space"
                            )}
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="indi-form-text ">
                            <InputMask
                              type="text"
                              className="form-control"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              mask="99/99/9999"
                              value={this.state.dateOfBirth}
                              onChange={e =>
                                this.setState({ dateOfBirth: e.target.value })
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
                              "dateOfBirth",
                              this.state.dateOfBirth,
                              "required"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row divide">
                        <div className="col-xl-6">
                          <div className="drop-down-section">
                            <label for="name" className="label-name mb-0">
                              <span className="drop-down-name ">
                                Marital Status
                              </span>
                            </label>
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown "
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onChange={e =>
                                  this.setState({ marital: e.target.value })
                                }
                              >
                                Select your marital Status
                              </button>
                              <div
                                className="dropdown-menu"
                                onClick={this.marital}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item text-14-semibold">
                                  Un-Married
                                </a>
                                <a className="dropdown-item text-14-semibold">
                                  Married
                                </a>
                                <a className="dropdown-item text-14-semibold">
                                  Divorced
                                </a>
                                <a className="dropdown-item text-14-semibold">
                                  Widower
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "Marital Status",
                              this.state.marital,
                              "required"
                            )}
                          </div>
                        </div>
                        <div className="col-xl-6 pr-5">
                        <div className="drop-down-section">
                            <label for="name" className="label-name mb-0">
                              <span className="drop-down-name ">
                                Residence Type
                              </span>
                            </label>
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle p-0 text-14-semibold dropdown-button residence-dropdown "
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onChange={e =>
                                  this.setState({ residenceType: e.target.value })
                                }
                              >
                                Select your Residence Type
                              </button>
                              <div
                                className="dropdown-menu"
                                onClick={this.residenceType}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item text-14-semibold">
                                  Owned
                                </a>
                                <a className="dropdown-item text-14-semibold">
                                  Rented
                                </a>
                                <a className="dropdown-item text-14-semibold">
                                  Company Provided
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "Marital Status",
                              this.state.marital,
                              "required"
                            )}
                          </div>
                          {/* <div className="indi-form-text">
                            <input
                              type="text"
                              className=""
                              name="name"
                              id="name"
                              autoComplete="off"
                              value={this.state.residenceType}
                              onChange={e =>
                                this.setState({ residenceType: e.target.value })
                              }
                              required
                            />
                            <label for="name" className=" label-name">
                              <span className="content-name">
                                Residence Type{" "}
                              </span>
                            </label>
                          </div> */}
                        </div>
                      </div>
                      <div className="row divide">
                        <div className="col-xl-6 pr-5">
                          <div className="indi-form-text">
                            <input
                              type="text"
                              className=""
                              name="panNumber"
                              id="panNumber"
                              maxlength="15"
                              autoComplete="off"
                              value={this.state.panNumber}
                              onChange={e =>
                                this.setState({ panNumber: e.target.value })
                              }
                              required
                            />
                            <label for="panNumber" className=" label-name">
                              <span className="content-name">PAN number</span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "panNumber",
                              this.state.panNumber,
                              "required|alpha_num"
                            )}
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="indi-form-text">
                            <input
                              type="tel"
                              className="form-control"
                              name="name"
                              id="name"
                              maxlength="14"
                              value={this.state.adharNumber}
                              onChange={e =>
                                this.setState({ adharNumber: e.target.value })
                              }
                              autoComplete="off"
                              required
                            />
                            <label for="name" className="form-label label-name">
                              <span className="content-name">
                                Aadhar number
                              </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "adharNumber",
                              this.state.adharNumber,
                              "required|numeric"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row divide">
                        <div className="col-xl-6">
                          <div className="indi-form-text">
                            <input
                              type="tel"
                              className="form-control"
                              name="dependent"
                              id="dependent"
                              autoComplete="off"
                              maxlength="3"
                              value={this.state.dependent}
                              onChange={e =>
                                this.setState({ dependent: e.target.value })
                              }
                              required
                            />
                            <label
                              for="dependent"
                              className="form-label label-name"
                            >
                              <span className="content-name">
                                Number of dependents{" "}
                              </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "dependent",
                              this.state.dependent,
                              "required|integer|min:1"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="personal-address-label text-16-bold">
                        Personal Address <div className="col-xl-12 line"></div>
                      </div>
                      <div className="row divide personal-address">
                        <div className=" col-xl-4 padding">
                          <div className="indi-form-text">
                            <input
                              type="text"
                              className=""
                              name="addressFirst"
                              value={this.state.addressFirst}
                              onChange={e =>
                                this.setState({ addressFirst: e.target.value })
                              }
                              id="addressFirst"
                              autoComplete="off"
                              required
                            />
                            <label for="addressFirst" className=" label-name">
                              <span className="content-name">
                                Address Line 1
                              </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "addressFirst",
                              this.state.addressFirst,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className=" col-xl-4 padding ">
                          <div className="indi-form-text ">
                            <input
                              type="text"
                              className=""
                              name="addressSecond"
                              id="addressSecond"
                              value={this.state.addressSecond}
                              onChange={e =>
                                this.setState({ addressSecond: e.target.value })
                              }
                              autoComplete="off"
                              required
                            />
                            <label for="addressSecond" className=" label-name">
                              <span className="content-name">
                                Address Line 2
                              </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "addressSecond",
                              this.state.addressSecond,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className=" col-xl-4 ">
                          <div className="indi-form-text ">
                            <input
                              type="text"
                              className="form-control"
                              name="landmark"
                              value={this.state.landmark}
                              onChange={e =>
                                this.setState({ landmark: e.target.value })
                              }
                              id="landmark"
                              autoComplete="off"
                              required
                            />
                            <label
                              for="landmark"
                              className="form-label label-name"
                            >
                              <span className="content-name">Landmark</span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "landmark",
                              this.state.landmark,
                              "required"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row divide">
                        <div className=" col-xl-4 padding">
                          <div className="">
                            <label for="city" className=" label-name mb-0">
                              <span className="drop-down-name">City</span>
                            </label>
                            {/* <VirtualizedSelect
                              placeholder="Select City"
                              options={options}
                              onChange={city => this.setState({ city })}
                              value={this.state.city}
                            /> */}
									          <VirtualizedSelect placeholder='Select your City' options={options} onChange={city => this.setState({ city })} value={this.state.city} />
                            
                            {/* <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" /> */}
                            {/* <input type='text' className='' name='city' id='city' value={this.state.city} onChange={e => this.setState({ city: e.target.value })} autoComplete='off' required /> */}
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "city",
                              this.state.city,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className=" col-xl-4 padding">
                          <div className="indi-form-text">
                            <label for="state" className=" label-name mb-0">
                              <span className="drop-down-name">State</span>
                            </label>
                            <input type='text' className='forma-control' name='state' id='state' value={this.state.city.state} disabled/>


                            {/* <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" /> */}
                            {/* <input type='text' className='' name='city' id='city' value={this.state.city} onChange={e => this.setState({ city: e.target.value })} autoComplete='off' required /> */}
                          </div>
                          {/* <div className="error-block">
                            {this.validator.message(
                              "state",
                              this.state.state,
                              "required"
                            )}
                          </div> */}
                        </div>

                        <div className=" col-xl-4">
                          <div className="indi-form-text ">
                            <input
                              type="tel"
                              className="form-control"
                              name="pincode"
                              maxlength="6"
                              id="pincode"
                              value={this.state.pincode}
                              onChange={e =>
                                this.setState({ pincode: e.target.value })
                              }
                              id="landmark"
                              autoComplete="off"
                              required
                            />
                            <label
                              for="pincode"
                              className="form-label label-name"
                            >
                              <span className="content-name">Pincode </span>
                            </label>
                          </div>
                          <div className="error-block">
                            {this.validator.message(
                              "pincode",
                              this.state.pincode,
                              "required|integer"
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row divide">
                        <div className="col-xl-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={this.state.checked}
                              onChange={this.handleChange}
                              value=""
                              id="defaultCheck1"
                            />
                            <label
                              className="form-check-label text-14-semibold"
                              for="defaultCheck1"
                            >
                              My personal address is the same as mailing
                              address.
                            </label>
                          </div>
                        </div>
                      </div>
                      {this.state.checked == false ? (
                        <div id="mailing-address-section">
                          <div className="personal-address-label text-16-bold">
                            Mailing Address
                            <div className="col-xl-12 line"></div>
                          </div>
                          <div className="row divide personal-address">
                            <div className=" col-xl-4 padding">
                              <div className="indi-form-text">
                                <input
                                  type="text"
                                  className=""
                                  name="addressFirstMail"
                                  id="addressFirstMail"
                                  autoComplete="off"
                                  value={this.state.addressFirstMail}
                                  onChange={e =>
                                    this.setState({
                                      addressFirstMail: e.target.value
                                    })
                                  }
                                  required
                                />
                                <label
                                  for="addressFirstMail"
                                  className=" label-name"
                                >
                                  <span className="content-name">
                                    Address Line 1
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "address First",
                                  this.state.addressFirstMail,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className=""
                                  name="addressSecondMail"
                                  id="addressSecondMail"
                                  autoComplete="off"
                                  value={this.state.addressSecondMail}
                                  onChange={e =>
                                    this.setState({
                                      addressSecondMail: e.target.value
                                    })
                                  }
                                  required
                                />
                                <label
                                  for="addressSecondMail"
                                  className=" label-name"
                                >
                                  <span className="content-name">
                                    Address Line 2
                                  </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "address Second",
                                  this.state.addressSecondMail,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 ">
                              <div className="indi-form-text ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="landmarkMail"
                                  id="landmarkMail"
                                  value={this.state.landmarkMail}
                                  onChange={e =>
                                    this.setState({
                                      landmarkMail: e.target.value
                                    })
                                  }
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="landmarkMail"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">Landmark</span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Landmark",
                                  this.state.landmarkMail,
                                  "required"
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row divide personal-address">
                            <div className=" col-xl-4 padding">
                              <div className="">
                                <label for="city" className=" label-name mb-0">
                                  <span className="drop-down-name">City</span>
                                </label>
                                <VirtualizedSelect
                                  placeholder="Select City"
                                  options={options}
                                  onChange={cityMail =>
                                    this.setState({ cityMail })
                                  }
                                  value={this.state.cityMail}
                                />
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "City",
                                  this.state.cityMail,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className=" col-xl-4 padding ">
                              <div className="indi-form-text">
                                <label for="state" className=" label-name mb-0">
                                  <span className="drop-down-name">State</span>
                                </label>
                                <input type='text' className='forma-control' name='state' id='state' value={this.state.city.state} disabled/>
                              </div>
                              {/* <div className="error-block">
                                {this.validator.message(
                                  "State",
                                  this.state.stateMail,
                                  "required"
                                )}
                              </div> */}
                            </div>

                            <div className=" col-xl-4 ">
                              <div className="indi-form-text ">
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="pincodeMail"
                                  maxlength="6"
                                  id="pincodeMail"
                                  value={this.state.pincodeMail}
                                  onChange={e =>
                                    this.setState({
                                      pincodeMail: e.target.value
                                    })
                                  }
                                  id="landmark"
                                  autoComplete="off"
                                  required
                                />
                                <label
                                  for="pincodeMail"
                                  className="form-label label-name"
                                >
                                  <span className="content-name">Pincode </span>
                                </label>
                              </div>
                              <div className="error-block">
                                {this.validator.message(
                                  "Pincode",
                                  this.state.pincodeMail,
                                  "required|integer"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <footer className="row justify-content-between">
                        <div className="col-xl-12">
                          <button className="secondary-cta"></button>
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

export default PersonalLoan;
