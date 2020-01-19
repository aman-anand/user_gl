import React, { Component } from 'react';

import documentUploadImg from '../../../images/document-upload.svg';

class documentUploadModal extends Component {

	gotIt=(e)=>{
		e.preventDefault();
		// console.log(e.target.innerHTML)
		window.location.href = "/application/documents";
	}
    render() {
        return (
            <div>
                {/* <!-- Document Upload Modal Start --> */}
				<div class="modal fade" id="document" tabindex="-1" role="dialog" aria-labelledby="documentTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
						<div class="modal-content text-left">
						<div class="modal-header modalHeader">
							<h5 class="modal-title text-20-bold blackish" id="documentTitle">Documents upload</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body modalBody">
							<div class='text-16-bold primary-color-five'>Instructions to upload</div>
							<div class='text-12-semibold grey padding9px'>We urge you to scan your documents through a scanner rather than using your smartphone.
								 However, if you are using a smart phone to scan your documents, do follow these instructions.</div>
							<div class='text-14-semibold grey dot'>
								
									<li>Clean your camera lens before clicking so that it does not have finger prints or smudges.</li>
									<li>Make sure the picture you upload is not blurry.</li>
									<li>Keep the documents on a straight surface, like a table.</li>
									<li>Keep the angle of your phone parallel to the surface while clicking, for better clarity.</li>
									<li>Click in a well lit environment. If the picture is dark, might as well use a photo editer to enhance the exposure and contrast.</li>
								
							</div>
							<br/>
							<div class='text-16-bold primary-color-five'>List of Documents</div>
							<div class='text-12-semibold grey padding5px'>Keep the following documents handy, you will need to them to complete your  application.</div>
							<div class='row '>
								{/* Accordian start */}
								<div class='col-lg-8 p-0 scrollableDiv'>
									<div class="container">
										<div class="row">
											<div class="col-lg-12">
												<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingOne">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
																Individual KYC documents
																</div>
															</h4>

														</div>
														<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Aadhar Card</li>
																	<li>PAN Card</li>
															
															</div>
														</div>
													</div>

													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingTwo">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																	Company KYC documents
																</div>
															</h4>

														</div>
														<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Shop act</li>
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingThree">
															<h4 class="panel-title text-16-semibold blackish ">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																	Income proof documents
																</div>
															</h4>

														</div>
														<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Latest 3 months salary slip</li>
															
															</div>
														</div>
													</div>
													<div class="panel panel-default accordionTitle">
														<div class="panel-heading" role="tab" id="headingFour">
															<h4 class="panel-title text-16-semibold blackish">
																<div class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																	Financial documents
																</div>
															</h4>

														</div>
														<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
															<div class="panel-body text-14-semibold grey dot">
																
																	<li>Updated 6 months bank statement</li>
																
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* Accordion end */}
								<div class='col-lg-4 text-center'>
									<img src={documentUploadImg} alt='document upload' className='img-fluid' />
								</div>
							</div>
						</div>
						<div class="modal-footer modalFooter">
							<button type="button" class="primary-button" data-dismiss="modal" onClick={this.gotIt}>Got it</button>
							
						</div>
						</div>
					</div>
				</div>
{/* <!-- Document Upload Modal End --> */}

            </div>
        );
    }
}

export default documentUploadModal;