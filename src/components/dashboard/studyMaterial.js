import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import closeIcon from '../../images/cross-small-01-512.png'
import { getElement, getTopic, getStudyMaterial, upload, setStudyMaterial, editStudyMaterial } from "../../services/masters";
import editIcon from '../../images/eye-icon.png'
import tickIcon from '../../images/tick-mark.png'
import crossIcon from '../../images/cross-icon.png'
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
			elementOptionList: [],
			preSelectedElementType: null,
			topicOptionList: [],
			preSelectedTopicType: null,
			uploadUrl: null,
			allowDownload: null,
			readingMinutes: null,
			selectedElementFromList: null,
			selectedTopicFromList: null,
			studyMaterialList: null,
			typeUpload: null
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
			}, () => {
				this.gettingListElement()
			})
		});
	}
	componentDidMount() {
		this.fetchCall()
	}

	addTopicClicked = () => {
		this.setState({
			modalIsOpenTopic: true
		}, () => {
			this.topicOptionListFunc()
		});
	}
	topicOptionListFunc = () => {
		let topicListToBePushed = []
		this.state.topicList.data.map((log, i) => {
			topicListToBePushed.push({name: log.topicName, _id: log._id})
			this.setState({
				topicOptionList: topicListToBePushed
			})
		})
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
		}, () => {
			this.gettingListElement()
		})
	}
	elementViewClicked = () => {
		console.log('Element List View')
		this.setState({
			courseView: false,
			elementView: true,
			topicView: false	
		}, () => {
			this.gettingListElement()
		})
	}
	topicViewClicked = () => {
		console.log('Topic List View')
		this.setState({
			courseView: false,
			elementView: false,
			topicView: true	
		}, () => {
			this.gettingListElement()
		})
	}
	fileUploadQuestionImage = (e) => {
		let formdata = new FormData()
		formdata.append("file", e.target.files[0])
		upload(formdata).then(res => {
			this.setState({
				uploadUrl: res.data.data.url
			}, () => {
				console.log(this.state.uploadUrl)
			})
		})
	}
	selectedElementType = (e) => {
		console.log(e)
		this.setState({
			selectedElementFromList: e[0]
		})
	}
	selectedTopicType = (e) => {
		console.log(e)
		this.setState({
			selectedTopicFromList: e[0]
		})
	}
	saveUploadValue = () => {
		console.log(this.state.selectedElementFromList._id)
		console.log(this.state.selectedTopicFromList._id)
		console.log(this.state.nameOnUploadForm)
		console.log(this.state.URLOnUploadForm)
		console.log(this.state.uploadUrl)
		console.log(this.state.allowDownload)
		console.log(this.state.readingMinutes)
		console.log(this.state.courseView)
		console.log(this.state.elementView)
		console.log(this.state.topicView)
		if(this.state.courseView){
				this.setState({
					typeUpload: 'video'
				}, () => {
					this.uploadFinal()
				})
			}
		if(this.state.elementView){
				this.setState({
					typeUpload: 'pdf'
				}, () => {
					this.uploadFinal()
				})
			}
		if(this.state.topicView){
				this.setState({
					typeUpload: 'ppt'
				}, () => {
					this.uploadFinal()
				})
			}
	}
	uploadFinal = () => {
		let quizSetString = {
			// 'title': this.state.nameOnUploadForm,
			// 'preTestQuiz': this.state.selectedElementFromList._id,
			// 'postTestQuiz': this.state.selectedTopicFromList._id,
			// 'url': this.state.URLOnUploadForm? this.state.URLOnUploadForm: this.state.uploadUrl,
			// 'readingMinutes': this.state.readingMinutes,
			// 'type': this.state.typeUpload


			"title": this.state.nameOnUploadForm,
			"isPreTest":false,
			"type": this.state.typeUpload,
			'url': this.state.URLOnUploadForm? this.state.URLOnUploadForm: this.state.uploadUrl,
			'readingMinutes': this.state.readingMinutes,
			"topic": this.state.selectedTopicFromList._id,
			"element": this.state.selectedElementFromList._id
		}
		setStudyMaterial(quizSetString).then(res => {
			console.log(res)
			this.setState({
				studyMaterialList: res.data
			}, () => {
				this.fetchCall()
			})
			this.closeAddTopicModal()
		})
		.catch(err => {
			alert(err)
		})
	}
	viewElementClicked = (e) => {
		console.log(e)
	}
	deleteElementClicked = (e) => {
		let quizSetString = {
			'_id': e._id,
			'status': 0
		}
		editStudyMaterial(quizSetString).then(res => {
			console.log(res)
			this.setState({
				studyMaterialList: res.data
			}, () => {
				this.fetchCall()
			})
			this.closeAddTopicModal()
		})
		.catch(err => {
			alert(err)
		})
	}
	gettingListElement = () => {
		if(this.state.studyMaterial){
			this.setState({
				elementListMap: this.state.studyMaterial.data.map((log, i) => {
					return (
						<>
						{this.state.courseView && log.type === 'video' && <tr>
							<td>{log.title}</td>
							<td>{log.readingMinutes}</td>
							<td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={editIcon} className='eyeIcon'/></td>
							{/* {log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={tickIcon} className='eyeIcon'/></td>}
							{!log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={crossIcon} className='eyeIcon'/></td>} */}
							<td className='text-underline pointer' onClick={() => {this.deleteElementClicked(log)}}><img src={deleteIcon} className='editIcon'/></td>
						</tr>}
						{this.state.elementView && log.type === 'pdf' && <tr>
							<td>{log.title}</td>
							<td>{log.readingMinutes}</td>
							<td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={editIcon} className='eyeIcon'/></td>
							{/* {log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={tickIcon} className='eyeIcon'/></td>}
							{!log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={crossIcon} className='eyeIcon'/></td>} */}
							<td className='text-underline pointer' onClick={() => {this.deleteElementClicked(log)}}><img src={deleteIcon} className='editIcon'/></td>
						</tr>}
						{this.state.topicView && log.type === 'ppt' && <tr>
							<td>{log.title}</td>
							<td>{log.readingMinutes}</td>
							<td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={editIcon} className='eyeIcon'/></td>
							{/* {log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={tickIcon} className='eyeIcon'/></td>}
							{!log.isPostTest && <td className='text-underline pointer' onClick={() => {this.viewElementClicked(log)}}><img src={crossIcon} className='eyeIcon'/></td>} */}
							<td className='text-underline pointer' onClick={() => {this.deleteElementClicked(log)}}><img src={deleteIcon} className='editIcon'/></td>
						</tr>}
						</>
					)
				})
			})
		}
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
									<div className='col-lg-12 py-10'>
											Element
										<Multiselect
											options={this.state.elementList.data}
											onSelect={this.selectedElementType} 
											onRemove={this.selectedElementType} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedElementType}
											/>
										</div>
									<div className='col-lg-12 py-10'>
											Topic
										<Multiselect
											options={this.state.topicOptionList}
											onSelect={this.selectedTopicType} 
											onRemove={this.selectedTopicType} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedTopicType}
											/>
										</div>
									<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.nameOnUploadForm} onChange={e => this.setState({nameOnUploadForm: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Name</span>
											</label>
										</div>
									</div>
									<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.URLOnUploadForm} onChange={e => this.setState({URLOnUploadForm: e.target.value })} />
											<label for='age' className='label-name'>
												<span className='content-name'>URL</span>
											</label>
										</div>
									</div>
									OR
									<div className='col-lg-12 py-10'>
											File
										<input type='file' onChange={this.fileUploadQuestionImage}/>
										{/* onChange={e => this.setState({ addQuestionImageValue: e.target.value })} */}
										</div>
										{/* <div className='form-element col-lg-12 py-10'>		
											Pre Test								
													<input type='checkbox' className='mx-3' name='age' id='age' autoComplete='off' value={this.state.allowDownload} checked={this.state.allowDownload} onChange={e => this.setState({ allowDownload: !this.state.allowDownload })} />
											</div> */}
									<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='number' className='' name='age' id='age' autoComplete='off' value={this.state.readingMinutes } onChange={e => this.setState({readingMinutes : e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Reading Minutes</span>
											</label>
										</div>
									</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddTopicModal}></img>
									<button onClick={this.saveUploadValue} className='save-button-style'>Save</button>
								</Modal>
							{/* This is for Videos */}
						{this.state.courseView && <div>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Reading Minutes</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.elementListMap}
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
										<th>Name</th>
										<th>Reading Minutes</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.elementListMap}
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
										<th>Reading Minutes</th>
										<th>View</th>
										<th>Delete</th>
									</tr>
									{this.state.elementListMap}
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
