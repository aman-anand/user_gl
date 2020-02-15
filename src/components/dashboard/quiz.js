import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import closeIcon from '../../images/close-icon-vector-23190083.jpg'
import { getCourses, getElement, getTopic, getQuiz, setElement, setCourse, setTopic, setQuiz } from "../../services/masters";
import editIcon from '../../images/web-circle-circular-round_58-512.png'
import deleteIcon from '../../images/010_trash-2-512.png'

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
class Quix extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanList: [],
			userData:'',
			courseList: [],
			elementList: [],
			topicList: [],
			quizList: [],
			courseView: true,
			elementView: false,
			topicView: false,
			modalIsOpenCourse: false,
			modalIsOpenElement: false,
			modalIsOpenTopic: false,
			addCourseValue: null,
			addElementValue: null,
			addQuizNameValue: null,
			addSourceValue: null,
			addRemarksValue: null,
			courseListMapOptions: [],
            elementListMapOptions: [],
            topicListMapOptions: [],
			courseListMap: [],
		 	elementListMap: [],
			topicListMap: [],
			quizListMap: [],
			sendingMultipleCoursesInTopic: null,
            sendingElementInTopic: null,
            sendingtopicInTopic: null,
            questionLimit: null,
            preTest: false,
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
		getQuiz(dataString).then(res => {
			console.log(res)
			this.setState({
				quizList: res.data
			}, () => {
				this.gettingListQuiz()
			})
		});
	}
	componentDidMount() {
		this.fetchCall()
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
	saveQuizValue = () => {
        console.log(this.state.addQuizNameValue)
        console.log(this.state.sendingMultipleCoursesInTopic)
        console.log(this.state.sendingElementInTopic)
        console.log(this.state.sendingtopicInTopic)
        console.log(this.state.questionLimit)
        console.log(this.state.preTest)
        console.log(this.state.addRemarksValue)
		let quizSetString = {
			'title': this.state.addQuizNameValue,
			'rank': this.state.sendingMultipleCoursesInTopic,
            'element': this.state.sendingElementInTopic,
            'topic': this.state.sendingtopicInTopic,
            'questionLimit': this.state.questionLimit,
			'preTest': this.state.preTest,
			'remarks': this.state.addRemarksValue
		}
		setQuiz(quizSetString).then(res => {
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
	elementSelectFunction = (e) => {
		let element = this.state.elementList.data.find(findingElementId)
		console.log(element._id)
		function findingElementId(data){
			if(data.name === e.target.value){
				return data.name
			}
		}
		this.setState({
			sendingElementInTopic : element._id
		})
	}
	topicSelectFunction = (e) => {
        console.log(e.target.value)
        console.log(this.state.topicList)
		let topic = this.state.topicList.data.find(findingtopicId)
		console.log(topic._id)
		function findingtopicId(data){
			if(data.topicName === e.target.value){
				return data.topicName
			}
		}
		this.setState({
			sendingtopicInTopic : topic._id
		})
	}
	multipleCourseSelectFunction = (e) => {
		let course  = this.state.courseList.data.find(findingCourseId)
		console.log(course._id)
		function findingCourseId(data){
			if(data.name === e.target.value){
				return data.name
			}
		}
		this.setState({
			sendingMultipleCoursesInTopic: course._id
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
                                <td className='text-underline'><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline'><img src={deleteIcon} className='editIcon'/></td>
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
                                <td className='text-underline'><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline'><img src={deleteIcon} className='editIcon'/></td>
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
                                <td className='text-underline'><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline'><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
                    }),
                    topicListMapOptions: this.state.topicList.data.map((log, i) => {
                        return (
                            <>
                            <option value={log.topicName}>{log.topicName}</option>
                            </>
                        )
                    })  
                })
			}
	}
	gettingListQuiz = () => {
			if(this.state.quizList){
				this.setState({
					quizListMap: this.state.quizList.data.map((log, i) => {
						return (
							<>
							<tr>
								<td>{log.title}</td>
								{log.preTest && <td>True</td>}
								{!log.preTest && <td>False</td>}
                                <td className='text-underline'><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline'><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
                    })
                })
			}
	}
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-2 pl-0'>
						<Navigation nav={3} />
					</div>
					<div className='col-xl-10 my-application'>
						<header>
							<h1>
								Welcome back, Sys Admin! <span>{moment().format("DD MMMM YYYY")}</span>
							</h1>
						</header>
						<div className='mainTab'>
							<div className='row top-nav'>
								<div className="col-xl-12 col-lg-12 col-md-12 text-center pointer text-underline">
									Quiz
								</div>
							</div>
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Title</th>
										<th>Pre Test</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
									{this.state.quizListMap}
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
									<h2 ref={subtitle => this.subtitle = subtitle}>New Quiz</h2>
									<div className='form-element'>										
										<div className='col-lg-12' >
											Rank
										<select name="cars" onChange={this.multipleCourseSelectFunction}>
											{this.state.courseListMapOptions}
										</select>
										</div>
										<div className='col-lg-12'>
											Element
										<select name="cars" onChange={this.elementSelectFunction}>
											{this.state.elementListMapOptions}
										</select>
										</div>
										<div className='col-lg-12'>
											Topic
										<select name="cars" onChange={this.topicSelectFunction}>
											{this.state.topicListMapOptions}
										</select>
										</div>
										<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addQuizNameValue} onChange={e => this.setState({ addQuizNameValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Title of Test</span>
											</label>
										</div>
									</div>
										<div className='form-element'>										
										<div className='indi-form-text'>
											<input type='number' className='' name='age' id='age' autoComplete='off' value={this.state.questionLimit} onChange={e => this.setState({ questionLimit: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Question Limit</span>
											</label>
										</div>
									</div>
                                    <div className='form-element'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addRemarksValue} onChange={e => this.setState({ addRemarksValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Remarks</span>
											</label>
										</div>
									</div>
                                    <div className='form-element'>		
                                    Pre Test								
											<input type='checkbox' className='' name='age' id='age' autoComplete='off' value={this.state.preTest} onChange={e => this.setState({ preTest: !this.state.preTest })} />
									</div>
									</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddTopicModal}></img>
									<button onClick={this.saveQuizValue} className='save-button-style'>Save</button>
								</Modal>
							</>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Quix;
