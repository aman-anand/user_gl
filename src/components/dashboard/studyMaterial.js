import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import closeIcon from '../../images/cross-small-01-512.png'
import { getElement, getTopic, getStudyMaterial } from "../../services/masters";
import editIcon from '../../images/web-circle-circular-round_58-512.png'
import deleteIcon from '../../images/010_trash-2-512.png'
import { Multiselect } from 'multiselect-react-dropdown'

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)',
	  width					: '500px',
	  minHeight				: '300px'
	}
  };
class StudyMaterial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elementList: [],
			topicList: [],
			courseView: true,
			elementView: false,
			topicView: false,
			modalIsOpenTopic: false,
			studyMaterial: null,
		};
	}

	fetchCall = () => {
		let dataString = {
			"email":"aadfsddf@adsdessf.com",
			"password":"aman",
				}
		getElement(dataString).then(res => {
			console.log(res)
			this.setState({
				elementList: res.data
			})
		});
		getTopic(dataString).then(res => {
			console.log(res)
			this.setState({
				topicList: res.data
			})
		});
		getStudyMaterial(dataString).then(res => {
			console.log(res)
			this.setState({
				studyMaterial: res.data
			})
		});
	}
	componentDidMount() {
		this.fetchCall()
	}
	addTopicClicked = () => {
		this.setState({
			modalIsOpenTopic: true
		});
	}
	closeAddTopicModal = () => {
		this.setState({modalIsOpenTopic: false})
	}
    courseViewClicked = () => {
		console.log('Course List View')
		this.setState({
			courseView: true,
			elementView: false,
			topicView: false	
		})
	}
	elementViewClicked = () => {
		console.log('Element List View')
		this.setState({
			courseView: false,
			elementView: true,
			topicView: false	
		})
	}
	topicViewClicked = () => {
		console.log('Topic List View')
		this.setState({
			courseView: false,
			elementView: false,
			topicView: true	
		})
	}
	render() {
        const textUnderlineCourse = this.state.courseView? 'text-underline': ''
		const textUnderlineElement = this.state.elementView? 'text-underline': ''
		const textUnderlineTopic = this.state.topicView? 'text-underline': ''
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-2 pl-0'>
						<Navigation nav={4} />
					</div>
					<div className='col-xl-10 my-application'>
						<header>
							<h1>
								Welcome back, Sys Admin! <span>{moment().format("DD MMMM YYYY")}</span>
							</h1>
						</header>
                        <div className='mainTab'>
                        <div className='row top-nav'>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineCourse].join(' ')} onClick={this.courseViewClicked}>
									Videos
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineElement].join(' ')} onClick = {this.elementViewClicked}>
									PDF
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineTopic].join(' ')} onClick = {this.topicViewClicked}>
									Presentation
								</div>
							</div>
							<>
							<Modal
									isOpen={this.state.modalIsOpenTopic}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Upload</h6>
									</div>
									<div className='col-lg-12'>
											Element
										{/* <Multiselect
											options={this.state.optionSelectList}
											onSelect={this.selectedQuestionType} 
											onRemove={this.selectedQuestionType} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedQuestionType}
											/> */}
										</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddTopicModal}></img>
									<button onClick={this.saveQuizValue} className='save-button-style'>Save</button>
								</Modal>
							{/* This is for Videos */}
						{this.state.courseView && <div>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Element</th>
										<th>Topic</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.quizListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1 fs-15' onClick={this.addTopicClicked}>Upload Video</button>
									</div>
								</div>}
								{/* End of Videos */}

								{/* This is for PDF */}
						{this.state.elementView && <div>
									<div className='table-div'>
									<table>
									<tr>
										<th>Names</th>
										<th>Element</th>
										<th>Topic</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.quizListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1 fs-15' onClick={this.addTopicClicked}>Upload PDF</button>
									</div>
								</div>}
								{/* PDF | End */}

								{/* This is for PPT */}
						{this.state.topicView && <div>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Elements</th>
										<th>Topic</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.quizListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1 fs-15' onClick={this.addTopicClicked}>Upload PPT</button>
									</div>
								</div>}
								{/* PPT | End */}
							</>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StudyMaterial;
