import React, { Component } from "react";

import Nav from "../nav/leftNav";
import TopNav from "./topNav";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import docUploadImg from "../../images/klao-t-r-ow.png";

import SimpleReactValidator from "simple-react-validator";
import { documentCategoryUuid } from "../../services/documentUpload";
import { aadharUpload } from "../../services/documentUpload";


class documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: 1,
      aadhar: [],
      panCard: [],
      salarySlips: [],
      bankStatement: [],
      loanPurposeUuid: '',
      aadharLoader: false,
      panLoader: false,
      salarySlipsLoader: false,
      bankStatementsLoader: false
    };

    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    registerPlugin(FilePondPluginFileValidateType);
    let documentCategoryUuidData = {
      access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
      loanPurposeUuid: '93e2c62d-7cb9-4607-8e38-41750c29c7a5'
      }
      let documentCategoryUuids = documentCategoryUuid(documentCategoryUuidData)
      documentCategoryUuids.then(res => {
        console.log(res)
        this.setState({
          loanPurposeUuid: res.data.loanPurposeUuid
        })
      })
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  next = e => {
    e.preventDefault();

    if (this.state.documents == 1 && this.state.aadhar.length > 0) {
      debugger
      this.setState({ aadharLoader: true });
      let aadhar = new FormData();
      aadhar.append("document", this.state.aadhar[0]);
      aadhar.append("access_token", sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,);
      console.log(this.state.aadhar)
      console.log(aadhar)
      
      let dataString = {
        access_token: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).access_token : null,
        documentCategoryUuid: "0e5e82a2-4cbd-4f91-a063-e885fc7b1598",
        document: aadhar
    }
      let otherDetailsCoApplicantData = aadharUpload(dataString);
      otherDetailsCoApplicantData.then(res => {
        console.log(res)
      })
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: new Headers(),
        body: aadhar
      })
        .then(data => {
          if (data.ok) {
            this.setState({
              documents: this.state.documents + 1,
              aadharLoader: false
            }, () => {
              console.log(this.state.documents + this.state.aadharLoader)
            });
            console.log("aadhar uploaded");
          }
        })
        .catch(err => console.log(err));
    } else if (this.state.documents == 2 && this.state.panCard.length > 0) {
      this.setState({ panLoader: true });

      let aadhar = new FormData();
      aadhar.append("aadhar card", this.state.panCard);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: new Headers(),
        body: aadhar
      })
        .then(data => {
          if (data.ok) {
            this.setState({
              documents: this.state.documents + 1,
              panLoader: false
            });
            console.log("pan card uploaded");
          }
        })
        .catch(err => console.log(err));

      // this.setState({ documents: this.state.documents + 1 });
    } else if (
      this.state.documents == 3 &&
      this.state.salarySlips.length == 3
    ) {
      this.setState({ salarySlipsLoader: true });

      let aadhar = new FormData();
      aadhar.append("aadhar card", this.state.salarySlips);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: new Headers(),
        body: aadhar
      })
        .then(data => {
          if (data.ok) {
            this.setState({
              documents: this.state.documents + 1,
              salarySlipsLoader: false
            });
            console.log("salary slips uploaded");
          }
        })
        .catch(err => console.log(err));

      // this.setState({ documents: this.state.documents + 1 });
    } else if (
      this.state.documents == 4 &&
      this.state.bankStatement.length == 6
    ) {
      this.setState({ bankStatementsLoader: true });

      let aadhar = new FormData();
      aadhar.append("aadhar card", this.state.bankStatement);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: new Headers(),
        body: aadhar
      })
        .then(data => {
          if (data.ok) {
            this.setState({ bankStatementsLoader: false });
            window.location.href = "/dashboard";
            console.log("bank statements uploaded");
          }
        })
        .catch(err => console.log(err));

      // this.setState({ documents: this.state.documents + 1 });
    } else this.validator.showMessages();
    this.forceUpdate();
    console.log(this.state.aadhar.length);
  };

  back = e => {
    e.preventDefault();
    if (this.state.documents > 1) {
      this.setState({
        documents: this.state.documents - 1
      });
    } else {
      window.location.href = "other-details";
    }
    console.log(this.state.aadhar);
  };

  render() {
    return (
      <div>
        <div className="documents">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-xl-3 p-0">
                <Nav active={6} />
              </div>
              <div className="col-xl-9 rightSec">
                <TopNav />
                {/* Form Section aadhar card */}

                {this.state.documents === 1 && (
                  <div className="container-fluid form-section">
                    <div className="row">
                      <div className="col-xl-12 formHeader blackish">
                        <div className="row  align-items-center justify-content-between">
                          <div className="col-xl-5 text-16-bold">
                            Individual KYC documents
                          </div>

                          <div className="col-xl-2 text-16-bold">1/4</div>
                        </div>
                      </div>
                    </div>

                    <div class="row formPart ">
                      <div class="col-xl-6">
                        <div className="text-16-bold blackish">Aadhar Card</div>
                        <div className="text-12-semibold docSubTitle grey">
                          We’ll need a clear photo or a PDF document of the
                          above
                        </div>
                        <FilePond
                          acceptedFileTypes={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf"
                          ]}
                          allowMultiple={true}
                          oninit={() => this.handleInit()}
                          maxFiles={1}
                          // acceptedFileTypes={'image/png', 'image/jpeg'}
                          onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                              aadhar: fileItems.map(fileItem => fileItem.file)
                              // fileUpdateStart: true
                            });
                          }}
                          labelIdle='<div class="row"> <div class="col-xl-12 dropRectangle d-flex align-items-center"><div class="  dropImg"  style="backgroundImage:url(Upload})"><?xml version="1.0" encoding="UTF-8"?>
                                                                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                            <!-- Generator: sketchtool 58 (101010) - https://sketch.com -->
                                                                            <title>9AF3E670-1087-4C5E-A667-CBB27B56C890@1.00x</title>
                                                                            <desc>Created with sketchtool.</desc>
                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="#6058f2" fill-rule="evenodd">
                                                                                <g id="atom/icon/upload" transform="translate(0.000000, -2.000000)" fill="#6058f2">
                                                                                    <g id="Upload" transform="translate(0.000000, 2.000000)">
                                                                                        <path d="M19.7070603,5.40681167 C19.5536575,5.40681167 19.4010154,5.41496021 19.2493875,5.43176658 C19.1652062,3.48502918 17.4955246,1.92585676 15.4551407,1.92585676 C14.7908179,1.92585676 14.1399337,2.09493899 13.5691739,2.40993103 C12.6834946,1.02849867 11.1076296,0.165771883 9.39027909,0.165771883 C6.81133734,0.165771883 4.69032194,2.0883183 4.49533558,4.52142175 C1.99829318,4.62633422 0.000253558327,6.61330504 0.000253558327,9.04106101 C0.000253558327,11.5362971 2.10960528,13.5660477 4.70249274,13.5660477 L8.45895935,13.5660477 C8.77235745,13.5660477 9.02642289,13.3108966 9.02642289,12.9961592 C9.02642289,12.6816764 8.77235745,12.4265252 8.45895935,12.4265252 L4.70274629,12.4265252 C2.73564079,12.4265252 1.13543419,10.9078408 1.13543419,9.04131565 C1.13543419,7.17529973 2.73564079,5.65712467 4.70274629,5.65712467 C4.80645165,5.65712467 4.90888921,5.66247215 5.01031255,5.67011141 C5.17461834,5.68538992 5.33334585,5.62427586 5.45023624,5.509687 C5.56712663,5.39509814 5.62899486,5.23569231 5.62062744,5.07195756 C5.61733118,5.01135279 5.61580983,4.94998408 5.61580983,4.8881061 C5.61580983,2.91259416 7.30907234,1.30554907 9.39053265,1.30554907 C10.8948942,1.30554907 12.2542204,2.15325199 12.8541394,3.46516711 C12.9271642,3.62482759 13.069664,3.74196286 13.2400552,3.78219629 C13.4099393,3.82242971 13.5899657,3.78143236 13.7258729,3.67091777 C14.2078873,3.28055172 14.8220056,3.06563395 15.4551407,3.06563395 C16.9232434,3.06563395 18.1177567,4.19598939 18.1177567,5.58557029 C18.1177567,5.73402653 18.1030503,5.88401061 18.0749054,6.03144828 C18.0371252,6.22828647 18.1045717,6.43047215 18.2534104,6.56441379 C18.4019956,6.6981008 18.6096599,6.74342706 18.8003357,6.68409549 C19.0926885,6.59293369 19.3977191,6.54658886 19.7068067,6.54658886 C21.3564572,6.54658886 22.698795,7.86537931 22.698795,9.48617507 C22.698795,11.1072255 21.3564572,12.4262706 19.7068067,12.4262706 L14.7421347,12.4262706 C14.4289902,12.4262706 14.1749247,12.6814218 14.1749247,12.9959045 C14.1749247,13.3106419 14.4289902,13.5657931 14.7421347,13.5657931 L19.7070603,13.5657931 C21.9827463,13.5657931 23.8339756,11.7354271 23.8339756,9.48617507 C23.8339756,7.23692308 21.9824927,5.40681167 19.7070603,5.40681167 Z" id="Path"></path>
                                                                                        <path d="M14.4507962,9.55620159 L12.2663912,6.36477454 C12.2615736,6.3578992 12.2549811,6.35306101 12.2501635,6.34618568 C12.2306395,6.32046684 12.2101012,6.29627586 12.1865203,6.27412202 C12.1743495,6.26266313 12.161418,6.2527321 12.148233,6.24254642 C12.1284555,6.22675862 12.1081708,6.21249867 12.0866183,6.19976658 C12.0716584,6.19085411 12.056952,6.18245093 12.0412314,6.17506631 C12.0184112,6.16411671 11.9943231,6.15545889 11.969728,6.14781963 C11.9537538,6.14272679 11.9387938,6.13687003 11.9228197,6.1330504 C11.8918855,6.12617507 11.8594301,6.12286472 11.8269746,6.12133687 C11.8173394,6.12082759 11.8082113,6.11777188 11.7985761,6.11777188 C11.7889409,6.11777188 11.7798128,6.12082759 11.7701775,6.12133687 C11.7374685,6.12311936 11.7052666,6.12617507 11.6743325,6.1330504 C11.6583583,6.13661538 11.6433984,6.14272679 11.6279313,6.14756499 C11.6030826,6.15520424 11.5789946,6.16386207 11.5559208,6.17506631 C11.5404537,6.18219629 11.5260009,6.19059947 11.5110409,6.19951194 C11.4892349,6.21249867 11.4686967,6.22675862 11.4486656,6.24280106 C11.4359877,6.25298674 11.4230562,6.26266313 11.411139,6.27412202 C11.387558,6.29627586 11.3665127,6.32097613 11.3472423,6.3469496 C11.3421711,6.35331565 11.3358321,6.35815385 11.3312681,6.36477454 L9.14610242,9.55620159 C8.96861159,9.8156817 9.03402964,10.1706525 9.29215202,10.3486472 C9.39053265,10.4166366 9.50235187,10.4489761 9.61315686,10.4489761 C9.79369039,10.4489761 9.97118122,10.3626525 10.0812255,10.2022281 L11.2313661,8.52235544 L11.2313661,19.1470345 C11.2313661,19.4617719 11.4854315,19.7169231 11.7988296,19.7169231 C12.1122277,19.7169231 12.3662932,19.4617719 12.3662932,19.1470345 L12.3662932,8.52286472 L13.5156731,10.2017188 C13.6931639,10.4611989 14.0463707,10.5268966 14.3047466,10.3489019 C14.562869,10.1703979 14.6280335,9.8156817 14.4507962,9.55620159 Z" id="Path"></path>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </svg></div><div class="rectangleText ">Drag & drop your files here </div><div class="secondary-cta">upload</div></div></div></div>'
                        />
                        <div className="error-block docError">
                          {this.validator.message(
                            "Aadhar Document",
                            this.state.aadhar,
                            "required"
                          )}
                        </div>

                        {/*div for aadhar loader */}
                        {this.state.aadharLoader && (
                          <div class="linear-activity">
                            <div class="indeterminate"></div>
                          </div>
                        )}
                      </div>

                      <div className="col-xl-6 sideImg">
                        <img
                          src={docUploadImg}
                          alt="upload"
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    <footer className="row justify-content-between">
                      <button className="secondary-cta" onClick={this.back}>
                        back
                      </button>
                      <button className="primary-button" onClick={this.next}>
                        next
                      </button>
                    </footer>
                  </div>
                )}

                {/* PAN card */}
                {this.state.documents === 2 && (
                  <div className="container-fluid form-section">
                    <div className="row">
                      <div className="col-xl-12 formHeader">
                        <div className="row  align-items-center justify-content-between">
                          <div className="col-xl-5 text-16-bold blackish">
                            Individual KYC documents
                          </div>

                          <div className="col-xl-2 text-16-bold">2/4</div>
                        </div>
                      </div>
                    </div>

                    <div class="row formPart ">
                      <div class="col-xl-6">
                        <div className="text-16-bold blackish">PAN Card</div>
                        <div className="text-12-semibold docSubTitle grey">
                          We’ll need a clear photo or a PDF document of the
                          above
                        </div>
                        <FilePond
                          acceptedFileTypes={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf"
                          ]}
                          allowMultiple={true}
                          maxFiles={1}
                          oninit={() => this.handleInit()}
                          onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                              panCard: fileItems.map(fileItem => fileItem.file)
                            });
                          }}
                          labelIdle='<div class="row"> <div class="col-xl-12 dropRectangle d-flex align-items-center"><div class="  dropImg"  style="backgroundImage:url(Upload})"><?xml version="1.0" encoding="UTF-8"?>
                                                                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                            <!-- Generator: sketchtool 58 (101010) - https://sketch.com -->
                                                                            <title>9AF3E670-1087-4C5E-A667-CBB27B56C890@1.00x</title>
                                                                            <desc>Created with sketchtool.</desc>
                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="#6058f2" fill-rule="evenodd">
                                                                                <g id="atom/icon/upload" transform="translate(0.000000, -2.000000)" fill="#6058f2">
                                                                                    <g id="Upload" transform="translate(0.000000, 2.000000)">
                                                                                        <path d="M19.7070603,5.40681167 C19.5536575,5.40681167 19.4010154,5.41496021 19.2493875,5.43176658 C19.1652062,3.48502918 17.4955246,1.92585676 15.4551407,1.92585676 C14.7908179,1.92585676 14.1399337,2.09493899 13.5691739,2.40993103 C12.6834946,1.02849867 11.1076296,0.165771883 9.39027909,0.165771883 C6.81133734,0.165771883 4.69032194,2.0883183 4.49533558,4.52142175 C1.99829318,4.62633422 0.000253558327,6.61330504 0.000253558327,9.04106101 C0.000253558327,11.5362971 2.10960528,13.5660477 4.70249274,13.5660477 L8.45895935,13.5660477 C8.77235745,13.5660477 9.02642289,13.3108966 9.02642289,12.9961592 C9.02642289,12.6816764 8.77235745,12.4265252 8.45895935,12.4265252 L4.70274629,12.4265252 C2.73564079,12.4265252 1.13543419,10.9078408 1.13543419,9.04131565 C1.13543419,7.17529973 2.73564079,5.65712467 4.70274629,5.65712467 C4.80645165,5.65712467 4.90888921,5.66247215 5.01031255,5.67011141 C5.17461834,5.68538992 5.33334585,5.62427586 5.45023624,5.509687 C5.56712663,5.39509814 5.62899486,5.23569231 5.62062744,5.07195756 C5.61733118,5.01135279 5.61580983,4.94998408 5.61580983,4.8881061 C5.61580983,2.91259416 7.30907234,1.30554907 9.39053265,1.30554907 C10.8948942,1.30554907 12.2542204,2.15325199 12.8541394,3.46516711 C12.9271642,3.62482759 13.069664,3.74196286 13.2400552,3.78219629 C13.4099393,3.82242971 13.5899657,3.78143236 13.7258729,3.67091777 C14.2078873,3.28055172 14.8220056,3.06563395 15.4551407,3.06563395 C16.9232434,3.06563395 18.1177567,4.19598939 18.1177567,5.58557029 C18.1177567,5.73402653 18.1030503,5.88401061 18.0749054,6.03144828 C18.0371252,6.22828647 18.1045717,6.43047215 18.2534104,6.56441379 C18.4019956,6.6981008 18.6096599,6.74342706 18.8003357,6.68409549 C19.0926885,6.59293369 19.3977191,6.54658886 19.7068067,6.54658886 C21.3564572,6.54658886 22.698795,7.86537931 22.698795,9.48617507 C22.698795,11.1072255 21.3564572,12.4262706 19.7068067,12.4262706 L14.7421347,12.4262706 C14.4289902,12.4262706 14.1749247,12.6814218 14.1749247,12.9959045 C14.1749247,13.3106419 14.4289902,13.5657931 14.7421347,13.5657931 L19.7070603,13.5657931 C21.9827463,13.5657931 23.8339756,11.7354271 23.8339756,9.48617507 C23.8339756,7.23692308 21.9824927,5.40681167 19.7070603,5.40681167 Z" id="Path"></path>
                                                                                        <path d="M14.4507962,9.55620159 L12.2663912,6.36477454 C12.2615736,6.3578992 12.2549811,6.35306101 12.2501635,6.34618568 C12.2306395,6.32046684 12.2101012,6.29627586 12.1865203,6.27412202 C12.1743495,6.26266313 12.161418,6.2527321 12.148233,6.24254642 C12.1284555,6.22675862 12.1081708,6.21249867 12.0866183,6.19976658 C12.0716584,6.19085411 12.056952,6.18245093 12.0412314,6.17506631 C12.0184112,6.16411671 11.9943231,6.15545889 11.969728,6.14781963 C11.9537538,6.14272679 11.9387938,6.13687003 11.9228197,6.1330504 C11.8918855,6.12617507 11.8594301,6.12286472 11.8269746,6.12133687 C11.8173394,6.12082759 11.8082113,6.11777188 11.7985761,6.11777188 C11.7889409,6.11777188 11.7798128,6.12082759 11.7701775,6.12133687 C11.7374685,6.12311936 11.7052666,6.12617507 11.6743325,6.1330504 C11.6583583,6.13661538 11.6433984,6.14272679 11.6279313,6.14756499 C11.6030826,6.15520424 11.5789946,6.16386207 11.5559208,6.17506631 C11.5404537,6.18219629 11.5260009,6.19059947 11.5110409,6.19951194 C11.4892349,6.21249867 11.4686967,6.22675862 11.4486656,6.24280106 C11.4359877,6.25298674 11.4230562,6.26266313 11.411139,6.27412202 C11.387558,6.29627586 11.3665127,6.32097613 11.3472423,6.3469496 C11.3421711,6.35331565 11.3358321,6.35815385 11.3312681,6.36477454 L9.14610242,9.55620159 C8.96861159,9.8156817 9.03402964,10.1706525 9.29215202,10.3486472 C9.39053265,10.4166366 9.50235187,10.4489761 9.61315686,10.4489761 C9.79369039,10.4489761 9.97118122,10.3626525 10.0812255,10.2022281 L11.2313661,8.52235544 L11.2313661,19.1470345 C11.2313661,19.4617719 11.4854315,19.7169231 11.7988296,19.7169231 C12.1122277,19.7169231 12.3662932,19.4617719 12.3662932,19.1470345 L12.3662932,8.52286472 L13.5156731,10.2017188 C13.6931639,10.4611989 14.0463707,10.5268966 14.3047466,10.3489019 C14.562869,10.1703979 14.6280335,9.8156817 14.4507962,9.55620159 Z" id="Path"></path>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </svg></div><div class="rectangleText ">Drag & drop your files here </div><div class="secondary-cta">upload</div></div></div></div>'
                        />
                        <div className="error-block docError">
                          {this.validator.message(
                            "Pan Card Document",
                            this.state.panCard,
                            "required"
                          )}
                        </div>

                        {this.state.panLoader && (
                          <div class="linear-activity">
                            <div class="indeterminate"></div>
                          </div>
                        )}
                      </div>

                      <div className="col-xl-6 sideImg">
                        <img
                          src={docUploadImg}
                          alt="upload"
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    <footer className="row justify-content-between">
                      <button className="secondary-cta" onClick={this.back}>
                        back
                      </button>
                      <button className="primary-button" onClick={this.next}>
                        next
                      </button>
                    </footer>
                  </div>
                )}

                {/* Latest 3 months salary slip */}
                {this.state.documents === 3 && (
                  <div className="container-fluid form-section">
                    <div className="row">
                      <div className="col-xl-12 formHeader blackish">
                        <div className="row  align-items-center justify-content-between">
                          <div className="col-xl-5 text-16-bold">
                            Income proof documents
                          </div>

                          <div className="col-xl-2 text-16-bold">3/4</div>
                        </div>
                      </div>
                    </div>

                    <div class="row formPart ">
                      <div class="col-xl-6">
                        <div className="text-16-bold blackish">
                          Latest 3 months salary slips
                        </div>
                        <div className="text-12-semibold docSubTitle grey">
                          We’ll need a clear photo or a PDF document of the
                          above
                        </div>
                        <FilePond
                          acceptedFileTypes={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf"
                          ]}
                          allowMultiple={true}
                          maxFiles={3}
                          oninit={() => this.handleInit()}
                          onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                              salarySlips: fileItems.map(
                                fileItem => fileItem.file
                              )
                            });
                          }}
                          labelIdle='<div class="row"> <div class="col-xl-12 dropRectangle d-flex align-items-center"><div class="  dropImg"  style="backgroundImage:url(Upload})"><?xml version="1.0" encoding="UTF-8"?>
                                                                                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                                            <!-- Generator: sketchtool 58 (101010) - https://sketch.com -->
                                                                                            <title>9AF3E670-1087-4C5E-A667-CBB27B56C890@1.00x</title>
                                                                                            <desc>Created with sketchtool.</desc>
                                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="#6058f2" fill-rule="evenodd">
                                                                                                <g id="atom/icon/upload" transform="translate(0.000000, -2.000000)" fill="#6058f2">
                                                                                                    <g id="Upload" transform="translate(0.000000, 2.000000)">
                                                                                                        <path d="M19.7070603,5.40681167 C19.5536575,5.40681167 19.4010154,5.41496021 19.2493875,5.43176658 C19.1652062,3.48502918 17.4955246,1.92585676 15.4551407,1.92585676 C14.7908179,1.92585676 14.1399337,2.09493899 13.5691739,2.40993103 C12.6834946,1.02849867 11.1076296,0.165771883 9.39027909,0.165771883 C6.81133734,0.165771883 4.69032194,2.0883183 4.49533558,4.52142175 C1.99829318,4.62633422 0.000253558327,6.61330504 0.000253558327,9.04106101 C0.000253558327,11.5362971 2.10960528,13.5660477 4.70249274,13.5660477 L8.45895935,13.5660477 C8.77235745,13.5660477 9.02642289,13.3108966 9.02642289,12.9961592 C9.02642289,12.6816764 8.77235745,12.4265252 8.45895935,12.4265252 L4.70274629,12.4265252 C2.73564079,12.4265252 1.13543419,10.9078408 1.13543419,9.04131565 C1.13543419,7.17529973 2.73564079,5.65712467 4.70274629,5.65712467 C4.80645165,5.65712467 4.90888921,5.66247215 5.01031255,5.67011141 C5.17461834,5.68538992 5.33334585,5.62427586 5.45023624,5.509687 C5.56712663,5.39509814 5.62899486,5.23569231 5.62062744,5.07195756 C5.61733118,5.01135279 5.61580983,4.94998408 5.61580983,4.8881061 C5.61580983,2.91259416 7.30907234,1.30554907 9.39053265,1.30554907 C10.8948942,1.30554907 12.2542204,2.15325199 12.8541394,3.46516711 C12.9271642,3.62482759 13.069664,3.74196286 13.2400552,3.78219629 C13.4099393,3.82242971 13.5899657,3.78143236 13.7258729,3.67091777 C14.2078873,3.28055172 14.8220056,3.06563395 15.4551407,3.06563395 C16.9232434,3.06563395 18.1177567,4.19598939 18.1177567,5.58557029 C18.1177567,5.73402653 18.1030503,5.88401061 18.0749054,6.03144828 C18.0371252,6.22828647 18.1045717,6.43047215 18.2534104,6.56441379 C18.4019956,6.6981008 18.6096599,6.74342706 18.8003357,6.68409549 C19.0926885,6.59293369 19.3977191,6.54658886 19.7068067,6.54658886 C21.3564572,6.54658886 22.698795,7.86537931 22.698795,9.48617507 C22.698795,11.1072255 21.3564572,12.4262706 19.7068067,12.4262706 L14.7421347,12.4262706 C14.4289902,12.4262706 14.1749247,12.6814218 14.1749247,12.9959045 C14.1749247,13.3106419 14.4289902,13.5657931 14.7421347,13.5657931 L19.7070603,13.5657931 C21.9827463,13.5657931 23.8339756,11.7354271 23.8339756,9.48617507 C23.8339756,7.23692308 21.9824927,5.40681167 19.7070603,5.40681167 Z" id="Path"></path>
                                                                                                        <path d="M14.4507962,9.55620159 L12.2663912,6.36477454 C12.2615736,6.3578992 12.2549811,6.35306101 12.2501635,6.34618568 C12.2306395,6.32046684 12.2101012,6.29627586 12.1865203,6.27412202 C12.1743495,6.26266313 12.161418,6.2527321 12.148233,6.24254642 C12.1284555,6.22675862 12.1081708,6.21249867 12.0866183,6.19976658 C12.0716584,6.19085411 12.056952,6.18245093 12.0412314,6.17506631 C12.0184112,6.16411671 11.9943231,6.15545889 11.969728,6.14781963 C11.9537538,6.14272679 11.9387938,6.13687003 11.9228197,6.1330504 C11.8918855,6.12617507 11.8594301,6.12286472 11.8269746,6.12133687 C11.8173394,6.12082759 11.8082113,6.11777188 11.7985761,6.11777188 C11.7889409,6.11777188 11.7798128,6.12082759 11.7701775,6.12133687 C11.7374685,6.12311936 11.7052666,6.12617507 11.6743325,6.1330504 C11.6583583,6.13661538 11.6433984,6.14272679 11.6279313,6.14756499 C11.6030826,6.15520424 11.5789946,6.16386207 11.5559208,6.17506631 C11.5404537,6.18219629 11.5260009,6.19059947 11.5110409,6.19951194 C11.4892349,6.21249867 11.4686967,6.22675862 11.4486656,6.24280106 C11.4359877,6.25298674 11.4230562,6.26266313 11.411139,6.27412202 C11.387558,6.29627586 11.3665127,6.32097613 11.3472423,6.3469496 C11.3421711,6.35331565 11.3358321,6.35815385 11.3312681,6.36477454 L9.14610242,9.55620159 C8.96861159,9.8156817 9.03402964,10.1706525 9.29215202,10.3486472 C9.39053265,10.4166366 9.50235187,10.4489761 9.61315686,10.4489761 C9.79369039,10.4489761 9.97118122,10.3626525 10.0812255,10.2022281 L11.2313661,8.52235544 L11.2313661,19.1470345 C11.2313661,19.4617719 11.4854315,19.7169231 11.7988296,19.7169231 C12.1122277,19.7169231 12.3662932,19.4617719 12.3662932,19.1470345 L12.3662932,8.52286472 L13.5156731,10.2017188 C13.6931639,10.4611989 14.0463707,10.5268966 14.3047466,10.3489019 C14.562869,10.1703979 14.6280335,9.8156817 14.4507962,9.55620159 Z" id="Path"></path>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg></div><div class="rectangleText ">Drag & drop your files here </div><div class="secondary-cta">upload</div></div></div></div>'
                        />
                        <div className="error-block docError">
                          {this.validator.message(
                            "3 months salary slips",
                            this.state.salarySlips,
                            "required|min:3"
                          )}
                        </div>

                        {this.state.salarySlipsLoader && (
                          <div class="linear-activity">
                            <div class="indeterminate"></div>
                          </div>
                        )}
                      </div>

                      <div className="col-xl-6 sideImg">
                        <img
                          src={docUploadImg}
                          alt="upload"
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    <footer className="row justify-content-between">
                      <button className="secondary-cta" onClick={this.back}>
                        back
                      </button>
                      <button className="primary-button" onClick={this.next}>
                        next
                      </button>
                    </footer>
                  </div>
                )}
                {/* Financial Documents Bank Statement*/}
                {this.state.documents === 4 && (
                  <div className="container-fluid form-section">
                    <div className="row">
                      <div className="col-xl-12 formHeader blackish">
                        <div className="row  align-items-center justify-content-between">
                          <div className="col-xl-5 text-16-bold">
                            Income proof documents
                          </div>

                          <div className="col-xl-2 text-16-bold">4/4</div>
                        </div>
                      </div>
                    </div>

                    <div class="row formPart ">
                      <div class="col-xl-6">
                        <div className="text-16-bold blackish">
                          Updated 6 months bank statement
                        </div>
                        <div className="text-12-semibold docSubTitle grey">
                          We’ll need a clear photo or a PDF document of the
                          above
                        </div>
                        <FilePond
                          acceptedFileTypes={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf"
                          ]}
                          allowMultiple={true}
                          oninit={() => this.handleInit()}
                          maxFiles={6}
                          onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                              bankStatement: fileItems.map(
                                fileItem => fileItem.file
                              )
                            });
                          }}
                          labelIdle='<div class="row"> <div class="col-xl-12 dropRectangle d-flex align-items-center"><div class="  dropImg"  style="backgroundImage:url(Upload})"><?xml version="1.0" encoding="UTF-8"?>
                                                                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                            <!-- Generator: sketchtool 58 (101010) - https://sketch.com -->
                                                                            <title>9AF3E670-1087-4C5E-A667-CBB27B56C890@1.00x</title>
                                                                            <desc>Created with sketchtool.</desc>
                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="#6058f2" fill-rule="evenodd">
                                                                                <g id="atom/icon/upload" transform="translate(0.000000, -2.000000)" fill="#6058f2">
                                                                                    <g id="Upload" transform="translate(0.000000, 2.000000)">
                                                                                        <path d="M19.7070603,5.40681167 C19.5536575,5.40681167 19.4010154,5.41496021 19.2493875,5.43176658 C19.1652062,3.48502918 17.4955246,1.92585676 15.4551407,1.92585676 C14.7908179,1.92585676 14.1399337,2.09493899 13.5691739,2.40993103 C12.6834946,1.02849867 11.1076296,0.165771883 9.39027909,0.165771883 C6.81133734,0.165771883 4.69032194,2.0883183 4.49533558,4.52142175 C1.99829318,4.62633422 0.000253558327,6.61330504 0.000253558327,9.04106101 C0.000253558327,11.5362971 2.10960528,13.5660477 4.70249274,13.5660477 L8.45895935,13.5660477 C8.77235745,13.5660477 9.02642289,13.3108966 9.02642289,12.9961592 C9.02642289,12.6816764 8.77235745,12.4265252 8.45895935,12.4265252 L4.70274629,12.4265252 C2.73564079,12.4265252 1.13543419,10.9078408 1.13543419,9.04131565 C1.13543419,7.17529973 2.73564079,5.65712467 4.70274629,5.65712467 C4.80645165,5.65712467 4.90888921,5.66247215 5.01031255,5.67011141 C5.17461834,5.68538992 5.33334585,5.62427586 5.45023624,5.509687 C5.56712663,5.39509814 5.62899486,5.23569231 5.62062744,5.07195756 C5.61733118,5.01135279 5.61580983,4.94998408 5.61580983,4.8881061 C5.61580983,2.91259416 7.30907234,1.30554907 9.39053265,1.30554907 C10.8948942,1.30554907 12.2542204,2.15325199 12.8541394,3.46516711 C12.9271642,3.62482759 13.069664,3.74196286 13.2400552,3.78219629 C13.4099393,3.82242971 13.5899657,3.78143236 13.7258729,3.67091777 C14.2078873,3.28055172 14.8220056,3.06563395 15.4551407,3.06563395 C16.9232434,3.06563395 18.1177567,4.19598939 18.1177567,5.58557029 C18.1177567,5.73402653 18.1030503,5.88401061 18.0749054,6.03144828 C18.0371252,6.22828647 18.1045717,6.43047215 18.2534104,6.56441379 C18.4019956,6.6981008 18.6096599,6.74342706 18.8003357,6.68409549 C19.0926885,6.59293369 19.3977191,6.54658886 19.7068067,6.54658886 C21.3564572,6.54658886 22.698795,7.86537931 22.698795,9.48617507 C22.698795,11.1072255 21.3564572,12.4262706 19.7068067,12.4262706 L14.7421347,12.4262706 C14.4289902,12.4262706 14.1749247,12.6814218 14.1749247,12.9959045 C14.1749247,13.3106419 14.4289902,13.5657931 14.7421347,13.5657931 L19.7070603,13.5657931 C21.9827463,13.5657931 23.8339756,11.7354271 23.8339756,9.48617507 C23.8339756,7.23692308 21.9824927,5.40681167 19.7070603,5.40681167 Z" id="Path"></path>
                                                                                        <path d="M14.4507962,9.55620159 L12.2663912,6.36477454 C12.2615736,6.3578992 12.2549811,6.35306101 12.2501635,6.34618568 C12.2306395,6.32046684 12.2101012,6.29627586 12.1865203,6.27412202 C12.1743495,6.26266313 12.161418,6.2527321 12.148233,6.24254642 C12.1284555,6.22675862 12.1081708,6.21249867 12.0866183,6.19976658 C12.0716584,6.19085411 12.056952,6.18245093 12.0412314,6.17506631 C12.0184112,6.16411671 11.9943231,6.15545889 11.969728,6.14781963 C11.9537538,6.14272679 11.9387938,6.13687003 11.9228197,6.1330504 C11.8918855,6.12617507 11.8594301,6.12286472 11.8269746,6.12133687 C11.8173394,6.12082759 11.8082113,6.11777188 11.7985761,6.11777188 C11.7889409,6.11777188 11.7798128,6.12082759 11.7701775,6.12133687 C11.7374685,6.12311936 11.7052666,6.12617507 11.6743325,6.1330504 C11.6583583,6.13661538 11.6433984,6.14272679 11.6279313,6.14756499 C11.6030826,6.15520424 11.5789946,6.16386207 11.5559208,6.17506631 C11.5404537,6.18219629 11.5260009,6.19059947 11.5110409,6.19951194 C11.4892349,6.21249867 11.4686967,6.22675862 11.4486656,6.24280106 C11.4359877,6.25298674 11.4230562,6.26266313 11.411139,6.27412202 C11.387558,6.29627586 11.3665127,6.32097613 11.3472423,6.3469496 C11.3421711,6.35331565 11.3358321,6.35815385 11.3312681,6.36477454 L9.14610242,9.55620159 C8.96861159,9.8156817 9.03402964,10.1706525 9.29215202,10.3486472 C9.39053265,10.4166366 9.50235187,10.4489761 9.61315686,10.4489761 C9.79369039,10.4489761 9.97118122,10.3626525 10.0812255,10.2022281 L11.2313661,8.52235544 L11.2313661,19.1470345 C11.2313661,19.4617719 11.4854315,19.7169231 11.7988296,19.7169231 C12.1122277,19.7169231 12.3662932,19.4617719 12.3662932,19.1470345 L12.3662932,8.52286472 L13.5156731,10.2017188 C13.6931639,10.4611989 14.0463707,10.5268966 14.3047466,10.3489019 C14.562869,10.1703979 14.6280335,9.8156817 14.4507962,9.55620159 Z" id="Path"></path>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </svg></div><div class="rectangleText ">Drag & drop your files here </div><div class="secondary-cta">upload</div></div></div></div>'
                        />
                        <div className="error-block docError">
                          {this.validator.message(
                            "6 months bank statement",
                            this.state.bankStatement,
                            "required|min:6"
                          )}
                        </div>

                        {this.state.bankStatementsLoader && (
                          <div class="linear-activity">
                            <div class="indeterminate"></div>
                          </div>
                        )}
                      </div>

                      <div className="col-xl-6 sideImg">
                        <img
                          src={docUploadImg}
                          alt="upload"
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    <footer className="row justify-content-between">
                      <button className="secondary-cta" onClick={this.back}>
                        back
                      </button>
                      <button className="primary-button" onClick={this.next}>
                        next
                      </button>
                    </footer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default documents;
