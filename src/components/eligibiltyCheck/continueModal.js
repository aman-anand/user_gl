import React, { Component } from 'react';
import $ from "jquery";
import exitPopUpImg from '../../images/sx-5-le-99-ex.png';

class continueModal extends Component {
    render() {
        $(document).on('click', '#closemodal', function () {
           
            $('#continueModal').css('display','none');
        });
        return (
            <div>
                    {/* <!-- Continue Later Modal Start  --> */}

				<div class="modal fade" id="continueModal" tabindex="-1" role="dialog" aria-labelledby="continueModalTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-body ">
								<div class='container-fluid exitModal'>
									<div class='row align-items-center justify-content-center'>
										<img src={exitPopUpImg} alt='exit' className='img-fluid' />
									</div>
									
									<div class='row align-items-center justify-content-center exitPopUpContent'>		
										<div class='col-xl-8 text-14-bold content-popup'>You are about to escape from checking your eligibility for loans. You will not be able to apply for a loan and proceed with your application.
Are you sure you want to exit?</div>
									</div>

									<div class='row align-items-center justify-content-center button-sec-popup'>
										<div class='col-xl-3'><button type="button" class="secondary-cta "  data-dismiss="modal">yes, exit</button></div>
										<div class='col-xl-6'>
											<a type="button" id="closemodal" class="primary-button" >No, continue</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Continue Later Modal End  --> */}
            </div>
        );
    }
}

export default continueModal;