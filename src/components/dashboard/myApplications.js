import React, { Component } from "react";
import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import closeIcon from '../../images/cross-small-01-512.png'
import { getCourses, getElement, updateElement, deleteElement, getTopic, updateTopic, setElement, setCourse, updateCourse, deleteCourse, deleteTopic, setTopic } from "../../services/masters";
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
	  width					: '500px'
	}
  };
let allCoursesSelectedInMultiselect = []
class MyApplications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanList: [],
			userData:'',
			courseList: [],
			elementList: [],
			topicList: [],
			courseView: true,
			elementView: false,
			topicView: false,
			modalIsOpenCourse: false,
			modalIsOpenElement: false,
			modalIsOpenTopic: false,
			modalIsOpenCourseDelete: false,
			modalIsOpenElementDelete: false,
			modalIsOpenTopicDelete: false,
			addCourseValue: null,
			addElementValue: null,
			addTopicValue: null,
			addSourceValue: null,
			courseListMapOptions: [],
			elementListMapOptions: [],
			courseListMap: [],
		 	elementListMap: [],
			topicListMap: [],
			sendingMultipleCoursesInTopic: null,
			sendingElementInTopic: null,
			courseEditValue: null,
			courseEditId: null,
			elementEditValue: null,
			elementEditId: null,
			topicEditValue: null,
			topicEditId: null,
			topicEditSource: null,
			topicEditRemarks: null,
			selectedElementList: null,
			selectedCourseList: null,
			modalDeleteShown: true,
			logOfSelected: null,
		};
	}

	fetchCall = () => {
		let dataString = {
			"email":"aadfsddf@adsdessf.com",
			"password":"aman",
				}
		getCourses(dataString).then(res => {
			console.log(res)
			this.setState({
				courseList: res.data
			}, () => {
				this.gettingListCourse()
			})
		} );
		getElement(dataString).then(res => {
			console.log(res)
			this.setState({
				elementList: res.data
			}, () => {
				this.gettingListElement()
			})
		});
		getTopic(dataString).then(res => {
			console.log(res)
			this.setState({
				topicList: res.data
			}, () => {
				this.gettingListTopic()
			})
		});
	}
	componentDidMount() {
		this.fetchCall()
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
	addElementClicked = (e) => {
		this.setState({
			elementEditValue: e.name,
			elementEditId: e._id
		})
		console.log('Add Element Clicked')
		this.setState({modalIsOpenElement: true});
	}
	closeAddElementModal = () => {
		this.setState({modalIsOpenElement: false})
	}
	addCourseClicked = (e) => {
		this.setState({
			courseEditValue: e.name,
			courseEditId: e._id
		})
		this.setState({modalIsOpenCourse: true});
	}
	closeAddCourseModal = () => {
		this.setState({modalIsOpenCourse: false})
	}
	addTopicClicked = (e) => {
		let elementToArray = []
		if(e.element){
			elementToArray.push(e.element)
		}
		this.setState({
			selectedCourseList: e.course,
			selectedElementList: elementToArray,
			topicEditValue: e.topicName,
			topicEditSource: e.source,
			topicEditRemarks: e.remarks,
			topicEditId: e._id
		})
		this.setState({modalIsOpenTopic: true});
	}
	closeAddTopicModal = () => {
		this.setState({modalIsOpenTopic: false})
	}
	saveElementValue = () => {
		if(this.state.elementEditId){
			console.log(this.state.elementEditValue)
		let elementSetString = {
			'name': this.state.elementEditValue,
			'_id': this.state.elementEditId
		}
		updateElement(elementSetString).then(res => {
			console.log(res)
			this.setState({
				elementList: res.data,
				elementEditValue: null,
				elementEditId: null
			}, () => {
				this.fetchCall()
			})
			this.closeAddElementModal()
		})
		.catch(err => {
			alert(err)
		})
		}
		if(!this.state.elementEditId){
			console.log(this.state.addElementValue)
		let elementSetString = {
			'name': this.state.addElementValue
		}
		setElement(elementSetString).then(res => {
			console.log(res)
			this.setState({
				elementList: res.data
			}, () => {
				this.fetchCall()
			})
			this.closeAddElementModal()
		})
		.catch(err => {
			alert(err)
		})
	}
	}
	saveTopicValue = () => {
		if(this.state.topicEditId){
			console.log(this.state.topicEditValue)
			console.log(this.state.topicEditRemarks)
			console.log(this.state.topicEditSource)
			console.log(this.state.topicEditId)
			console.log(this.state.sendingElementInTopic)
			console.log(this.state.sendingMultipleCoursesInTopic)
			// console.log(this.state.)
			let topicSetString = {
				'topicName': this.state.topicEditValue,
				'course': this.state.sendingMultipleCoursesInTopic,
				'element': this.state.sendingElementInTopic,
				'source': this.state.topicEditSource,
				'remarks': this.state.topicEditRemarks,
				"_id": this.state.topicEditId
			}
			updateTopic(topicSetString).then(res => {
				console.log(res)
				this.setState({
					topicList: res.data
				}, () => {
					this.fetchCall()
				})
				this.closeAddTopicModal()
			})
			.catch(err => {
				alert(err)
			})
			}
		if(!this.state.topicEditId){
				console.log(this.state.addTopicValue)
			console.log(this.state.addRemarksValue)
			console.log(this.state.addSourceValue)
			console.log(this.state.sendingMultipleCoursesInTopic)
			console.log(this.state.sendingElementInTopic)
			// console.log(this.state.)
			let topicSetString = {
				'topicName': this.state.addTopicValue,
				'course': this.state.sendingMultipleCoursesInTopic,
				'element': this.state.sendingElementInTopic,
				'source': this.state.addSourceValue,
				'remarks': this.state.addRemarksValue
			}
			setTopic(topicSetString).then(res => {
				console.log(res)
				this.setState({
					topicList: res.data
				}, () => {
					this.fetchCall()
				})
				this.closeAddTopicModal()
			})
			.catch(err => {
				alert(err)
			})
			}
	}
	saveCourseValue = () => {
		console.log(this.state.courseEditId)
		if(this.state.courseEditId){
			console.log(this.state.courseEditValue)
		let courseSetString = {
			'name': this.state.courseEditValue,
			'_id': this.state.courseEditId
		}
		updateCourse(courseSetString).then(res => {
			console.log(res)
			this.setState({
				courseList: res.data,
				courseEditValue: null,
				courseEditId: null
			}, () => {
				this.fetchCall()
			})
			this.closeAddCourseModal()
		})
		.catch(err => {
			alert(err)
		})
		}
		if(!this.state.courseEditId){
			console.log(this.state.addCourseValue)
		let courseSetString = {
			'name': this.state.addCourseValue
		}
		setCourse(courseSetString).then(res => {
			console.log(res)
			this.setState({
				courseList: res.data
			}, () => {
				this.fetchCall()
			})
			this.closeAddCourseModal()
		})
		.catch(err => {
			alert(err)
		})
		}
	}
	deleteCourseClickeds = (e) => {
		console.log('Came to this func')
		console.log(e)
		// this.deleteCourseClicked(e)
		this.setState({
			modalIsOpenCourseDelete: true,
			logOfSelected: e
		}, () => {
			console.log(this.state.logOfSelected)
		})
	}
	deleteFuncCourse = () => {
		if(this.state.logOfSelected){
			console.log(this.state.logOfSelected)
			this.deleteCourseClicked(this.state.logOfSelected)
		}
	}
	deleteCourseClicked = (e) => {
		console.log(e)
		this.setState({
			courseEditValue: e.name,
			courseEditId: e._id
		}, () => {
			if(this.state.courseEditId){
				console.log(this.state.courseEditValue)
			let courseSetString = {
				'name': this.state.courseEditValue,
				'_id': this.state.courseEditId,
				'status': 0
			}
			deleteCourse(courseSetString).then(res => {
				console.log(res)
				this.setState({
					courseList: res.data,
					courseEditValue: null,
					courseEditId: null
				}, () => {
					this.fetchCall()
				})
				this.closeAddCourseDeleteModal()
			})
			.catch(err => {
				alert(err)
			})
			}
		})
	}
	deleteElementClickeds = (e) => {
		console.log('Came to this func')
		console.log(e)
		// this.deleteCourseClicked(e)
		this.setState({
			modalIsOpenElementDelete: true,
			logOfSelected: e
		}, () => {
			console.log(this.state.logOfSelected)
		})
	}
	deleteFuncElement = () => {
		if(this.state.logOfSelected){
			console.log(this.state.logOfSelected)
			this.deleteElementClicked(this.state.logOfSelected)
		}
	}
	deleteElementClicked = (e) => {
		console.log(e)
		this.setState({
			elementEditValue: e.name,
			elementEditId: e._id
		}, () => {
			if(this.state.elementEditId){
				console.log(this.state.elementEditValue)
			let elementSetString = {
				'name': this.state.elementEditValue,
				'_id': this.state.elementEditId,
				'status': 0
			}
			deleteElement(elementSetString).then(res => {
				console.log(res)
				this.setState({
					elementList: res.data,
					elementEditValue: null,
					elementEditId: null
				}, () => {
					this.fetchCall()
				})
				this.closeAddElementDeleteModal()
			})
			.catch(err => {
				alert(err)
			})
			}
		})
	}
	deleteTopicClickeds = (e) => {
		console.log('Came to this func')
		console.log(e)
		// this.deleteCourseClicked(e)
		this.setState({
			modalIsOpenTopicDelete: true,
			logOfSelected: e
		}, () => {
			console.log(this.state.logOfSelected)
		})
	}
	deleteFuncTopic = () => {
		if(this.state.logOfSelected){
			console.log(this.state.logOfSelected)
			this.deleteTopicClicked(this.state.logOfSelected)
		}
	}
	deleteTopicClicked = (e) => {
		console.log(e)
		this.setState({
			topicEditValue: e.name,
			topicEditId: e._id
		}, () => {
			if(this.state.topicEditId){
				console.log(this.state.topicEditValue)
			let topicSetString = {
				'name': this.state.topicEditValue,
				'_id': this.state.topicEditId,
				'status': 0
			}
			deleteTopic(topicSetString).then(res => {
				console.log(res)
				this.setState({
					topicList: res.data,
					topicEditValue: null,
					topicEditId: null
				}, () => {
					this.fetchCall()
				})
				this.closeAddTopicDeleteModal()
			})
			.catch(err => {
				alert(err)
			})
			}
		})
	}
	gettingListCourse = () => {
			if(this.state.courseList){
				this.setState({
					courseListMap:  this.state.courseList.data.map((log, i) => { 
						return (
							<>
							<tr>
								<td>{log.name}</td>
								<td className='text-underline pointer' onClick={() => {this.addCourseClicked(log)}} ><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline pointer' onClick={() => {this.deleteCourseClickeds(log)}}><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
					}),
					courseListMapOptions: this.state.courseList.data.map((log, i) => {
						return (
							<>
								<option value={log.name}>{log.name}</option>
							</>
						)
					})
				})
			}
		}
	gettingListElement = () => {
			if(this.state.elementList){
				this.setState({
					elementListMap: this.state.elementList.data.map((log, i) => {
						return (
							<>
							<tr>
								<td>{log.name}</td>
								<td className='text-underline pointer' onClick={() => {this.addElementClicked(log)}}><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline pointer' onClick={() => {this.deleteElementClickeds(log)}}><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
					}),
					elementListMapOptions: this.state.elementList.data.map((log, i) => {
						return (
							<>
								<option value={log.name}>{log.name}</option>
							</>
						)
					})
				})
			}
		}
	gettingListTopic = () => {
			if(this.state.topicList){
				this.setState({
					topicListMap: this.state.topicList.data.map((log, i) => {
						return (
							<>
							<tr>
								<td>{log.topicName}</td>
								<td>{log.element.name}</td>
								<td className='text-underline pointer' onClick={() => {this.addTopicClicked(log)}}><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline pointer' onClick={() => {this.deleteTopicClickeds(log)}}><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
					})
				})
			}
	}
	onSelectCourseList = (e) => {
		let testArray = []
		console.log(e)
		for(let i=0; i<e.length; i++){
			testArray.push(e[i]._id)
			console.log(testArray)
		}
		this.setState({
			sendingMultipleCoursesInTopic: testArray
		}, () => {
			console.log(this.state.sendingMultipleCoursesInTopic)
		})
	}
	onSelectElementList = (e) => {
		let testArray = []
		console.log(e)
		for(let i=0; i<e.length; i++){
			testArray.push(e[i]._id)
			console.log(testArray)
		}
		this.setState({
			sendingElementInTopic : testArray
		}, () => {
			console.log(this.state.sendingElementInTopic)
		})
	}

	closeAddCourseDeleteModal = () => {
		this.setState({
			modalIsOpenCourseDelete: false,
			logOfSelected: null,	
		})
	}
	closeAddElementDeleteModal = () => {
		this.setState({
			modalIsOpenElementDelete: false,
			logOfSelected: null,	
		})
	}
	closeAddTopicDeleteModal = () => {
		this.setState({
			modalIsOpenTopicDelete: false,
			logOfSelected: null,	
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
						<Navigation nav={1} />
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
									Employees Designation
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineElement].join(' ')} onClick = {this.elementViewClicked}>
									Branch
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineTopic].join(' ')} onClick = {this.topicViewClicked}>
									Sub-branch
								</div>
							</div>
							{
								this.state.elementView && 
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
									{this.state.elementListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1' onClick={this.addElementClicked}> + Add</button>
									</div>
									<Modal
									isOpen={this.state.modalIsOpenElement}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Add Branch</h6>
									</div>
									<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.elementEditValue} onChange={e => this.setState({ addElementValue: e.target.value, elementEditValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Branch Name</span>
											</label>
										</div>
									</div>
										<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddElementModal}></img>
									<button onClick={this.saveElementValue} className='save-button-style'>Save</button>
								</Modal>
								{/* Modal for the confirmation of the Delete option | Element | Start */}
								<Modal
									isOpen={this.state.modalIsOpenElementDelete}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Confirm Delete ?</h6>
									</div>
									<div className='col-lg-12 col-md-12 col-sm-12 row m-0 my-50'>
									  <button onClick={this.deleteFuncElement} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>Yes</button>
									  <div className='col-lg-4 col-md-4 col-sm-4'></div>
									  <button onClick={this.closeAddElementDeleteModal} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>No</button>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style pointer' onClick={this.closeAddElementDeleteModal}></img>
									{/* <button onClick={this.saveCourseValue} className='save-button-style'>Save</button> */}
								</Modal>
								{/* Modal for the confirmation of the Delete option | End */}
							</>
							
							}
							{
								this.state.topicView && 
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Branch</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
									{this.state.topicListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1' onClick={this.addTopicClicked}> + Add</button>
									</div>
									<Modal
									isOpen={this.state.modalIsOpenTopic}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Add Sub-branch</h6>
									</div>
									<div className='form-element'>										
										{/* <div className='col-lg-12 py-10' >
											Employee Designation
										<select name="cars" multiple onChange={this.multipleCourseSelectFunction} className='multiple-select-style'>
											{this.state.courseListMapOptions}
										</select>
										</div> */}
										<div className='col-lg-12 py-10'>
										Employee Designation
										<Multiselect
											options={this.state.courseList.data}
											onSelect={this.onSelectCourseList} 
											onRemove={this.onSelectCourseList} 
											displayValue="name" 
											placeholder='Select Designation'
											selectedValues = {this.state.selectedCourseList}
											/>
										</div>
										{/* <div className='col-lg-12 py-10'>
											Branch
										<select name="cars" onChange={this.elementSelectFunction} className='single-select-style'>
											{this.state.elementListMapOptions}
										</select>
										</div> */}
										<div className='col-lg-12 py-10'>
											Branch
										<Multiselect
											options={this.state.elementList.data}
											onSelect={this.onSelectElementList} 
											onRemove={this.onSelectElementList} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Branch'
											selectedValues = {this.state.selectedElementList}
											/>
										</div>
										<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.topicEditValue} onChange={e => this.setState({ addTopicValue: e.target.value, topicEditValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Sub-branch Name</span>
											</label>
										</div>
									</div>
										<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.topicEditSource} onChange={e => this.setState({ addSourceValue: e.target.value, topicEditSource: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Source</span>
											</label>
										</div>
									</div>
										<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.topicEditRemarks} onChange={e => this.setState({ addRemarksValue: e.target.value, topicEditRemarks: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Remarks</span>
											</label>
										</div>
									</div>
									</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddTopicModal}></img>
									<button onClick={this.saveTopicValue} className='save-button-style'>Save</button>
								</Modal>
								{/* Modal for the confirmation of the Delete option | Topic | Start */}
								<Modal
									isOpen={this.state.modalIsOpenTopicDelete}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Confirm Delete ?</h6>
									</div>
									<div className='col-lg-12 col-md-12 col-sm-12 row m-0 my-50'>
									  <button onClick={this.deleteFuncTopic} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>Yes</button>
									  <div className='col-lg-4 col-md-4 col-sm-4'></div>
									  <button onClick={this.closeAddTopicDeleteModal} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>No</button>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style pointer' onClick={this.closeAddTopicDeleteModal}></img>
									{/* <button onClick={this.saveCourseValue} className='save-button-style'>Save</button> */}
								</Modal>
								{/* Modal for the confirmation of the Delete option | End */}
							</>
							}
							{
								this.state.courseView && 
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
									{this.state.courseListMap}
									</table>
									</div>
								
									<div className='bottom-button'>
										<button className='br-4 button px-4 py-1' onClick={this.addCourseClicked}> + Add</button>
									</div>
									<Modal
									isOpen={this.state.modalIsOpenCourse}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Add Employees Designation</h6>
									</div>
									<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.courseEditValue} onChange={e => this.setState({ addCourseValue: e.target.value, courseEditValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Employee Designation</span>
											</label>
										</div>
										<div>

										</div>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddCourseModal}></img>
									<button onClick={this.saveCourseValue} className='save-button-style'>Save</button>
								</Modal>

								{/* Modal for the confirmation of the Delete option | Course | Start */}
									<Modal
									isOpen={this.state.modalIsOpenCourseDelete}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Confirm Delete ?</h6>
									</div>
									<div className='col-lg-12 col-md-12 col-sm-12 row m-0 my-50'>
									  <button onClick={this.deleteFuncCourse} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>Yes</button>
									  <div className='col-lg-4 col-md-4 col-sm-4'></div>
									  <button onClick={this.closeAddCourseDeleteModal} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>No</button>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style pointer' onClick={this.closeAddCourseDeleteModal}></img>
									{/* <button onClick={this.saveCourseValue} className='save-button-style'>Save</button> */}
								</Modal>
								{/* Modal for the confirmation of the Delete option | End */}

							</>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyApplications;
