import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { getCourses, getElement, getTopic, setElement, setCourse, setTopic } from "../../services/masters";

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
			addCourseValue: null,
			addElementValue: null,
			courseListMapOptions: [],
			courseListMap: [],
		 	elementListMap: [],
		 	topicListMap: [],
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
	addElementClicked = () => {
		console.log('Add Element Clicked')
		this.setState({modalIsOpenElement: true});
	}
	closeAddElementModal = () => {
		this.setState({modalIsOpenElement: false})
	}
	addCourseClicked = () => {
		console.log('Add Course Clicked')
		this.setState({modalIsOpenCourse: true});
	}
	closeAddCourseModal = () => {
		this.setState({modalIsOpenCourse: false})
	}
	addTopicClicked = () => {
		console.log('Add Topic Clicked')
		this.setState({modalIsOpenTopic: true});
	}
	closeAddTopicModal = () => {
		this.setState({modalIsOpenTopic: false})
	}
	saveElementValue = () => {
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
	saveTopicValue = () => {
		console.log(this.state.addTopicValue)
		let topicSetString = {
			'name': this.state.addTopicValue
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
	saveCourseValue = () => {
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
	gettingListCourse = () => {
			if(this.state.courseList){
				this.setState({
					courseListMap:  this.state.courseList.data.map((log, i) => { 
						return (
							<>
							<tr>
								<td>{log.name}</td>
								<td className='text-underline'>Edit</td>
								<td className='text-underline'>Delete</td>
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
								<td className='text-underline'>Edit</td>
								<td className='text-underline'>Delete</td>
							</tr>
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
								<td className='text-underline'>Edit</td>
								<td className='text-underline'>Delete</td>
							</tr>
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
									Courses
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineElement].join(' ')} onClick = {this.elementViewClicked}>
									Elements
								</div>
								<div className={["col-xl-4 col-lg-4 col-md-4 text-center pointer", textUnderlineTopic].join(' ')} onClick = {this.topicViewClicked}>
									Topics
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
									<h2 ref={subtitle => this.subtitle = subtitle}>Add Elements</h2>
									<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ addElementValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Element Name</span>
											</label>
										</div>
									</div>
									<button onClick={this.closeAddElementModal} className='close-button-style'>Close Me</button>
									<button onClick={this.saveElementValue} className='save-button-style'>Save</button>
								</Modal>
							</>
							}
							{
								this.state.topicView && 
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Name</th>
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
									<h2 ref={subtitle => this.subtitle = subtitle}>Add Topics</h2>
									<div className='form-element'>										
										{/* <div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ addTopicValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Topic Name</span>
											</label>
										</div> */}
										<div className='col-lg-12'>
											Please select course(s)
										<select name="cars" multiple>
											{this.state.courseListMapOptions}
										</select>
										</div>
									</div>
									<button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button>
									<button onClick={this.saveTopicValue} className='save-button-style'>Save</button>
								</Modal>
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
									<h2 ref={subtitle => this.subtitle = subtitle}>Add Courses</h2>
									<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.age} onChange={e => this.setState({ addCourseValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Course Name</span>
											</label>
										</div>
										<div>

										</div>
									</div>
									<button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button>
									<button onClick={this.saveCourseValue} className='save-button-style'>Save</button>
								</Modal>
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
