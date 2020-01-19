import React, { Component } from 'react';

import exitPopUpImg from '../../../images/sx-5-le-99-ex.png';

class continueLaterModal extends Component {
    render() {
        return (
            <div>
                    {/* <!-- Continue Later Modal Start  --> */}

				<div class="modal fade" id="continueLaterModal" tabindex="-1" role="dialog" aria-labelledby="continueLaterModalTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-body ">
								<div class='container-fluid exitModal'>
									<div class='row align-items-center justify-content-center'>
										<img src={exitPopUpImg} alt='exit' className='img-fluid' />
									</div>
									
									<div class='row align-items-center justify-content-center exitPopUpContent'>		
										<div class='col-xl-8 text-14-bold'>Your progress will be saved in “My Applications” You can come back anytime to resume your application.</div>
									</div>

									<div class='row align-items-center justify-content-center'>
										<div class='col-xl-3'><button type="button" class="secondary-cta " onClick={()=>window.location.href = '/'}>okay, exit</button></div>
										<div class='col-xl-6'>
											<button type="button" class="primary-button" data-dismiss="modal">CONTINUE APPLICATION</button>
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

export default continueLaterModal;