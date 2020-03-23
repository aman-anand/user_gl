import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import closeIcon from '../../images/cross-small-01-512.png'
import { getCourses, getElement, getTopic, getQuiz, setElement, setCourse, setTopic, getQuestions, setQuiz, upload, postQuestions, putQuestions, putQuiz } from "../../services/masters";
import editIcon from '../../images/web-circle-circular-round_58-512.png'
import deleteIcon from '../../images/010_trash-2-512.png'
import backIcon from '../../images/back-button.png'
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
const customStylesDelete = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)',
	  width					: '500px',
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
            questionLists: [],
			courseView: true,
			elementView: false,
			topicView: false,
			modalIsOpenCourse: false,
			modalIsOpenElement: false,
			modalIsOpenTopic: false,
			modalIsOpenQuestion: false,
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
            showQuizQuestions: false,
            quizQuestionObject: null,
            quizQuestionObjectTitle: null,
			quizQuestionMap: [],
			uploadUrl: null,
			addOption1Value: null,
			addOption2Value: null,
			addOption3Value: null,
			addOption4Value: null,
			showAnswerOpton: null,
			showOptions: true,
			showAnswerDropdown: true,
			optionListData: [],
			selectQuestionTypeValue: null,
			exactAnswerOfQuestion: null,
			optionSelectList: [{name: 'MCQ'},{name: 'TRUE/FALSE'},{name: "DESCRIPTIVE"}],
			questionTypeSelected: false,
			questionEditId: null,
			topicListForDropdownState: null,
			preSelectedCourseList: null,
			preSelectedElementList: null,
			preSelectedTopicList: null,
			idEditQuiz: null,
			disableTypeQuestion: false,
			modalIsOpenQuizDelete: false,
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
	addTopicClicked = (e) => {
		console.log(e)
		this.setState({
			modalIsOpenTopic: true
		}, () => {
			if(e._id){
				this.setState({
					idEditQuiz: e._id
				}, () => {
					this.setDataOfQuizModal(e)
				})
			}
		});
	}
	setDataOfQuizModal = (e) => {
		let dataForTopic = []
		let dataForCourses = []
		let dataForElement = []
		dataForTopic.push({name: e.topic.topicName, _id: e.topic._id})
		dataForCourses.push(e.rank)
		dataForElement.push(e.element)
		this.setState({
			preSelectedCourseList: dataForCourses,
			preSelectedElementList: dataForElement,
			preSelectedTopicList: dataForTopic,
			addQuizNameValue: e.title,
			questionLimit: e.questionLimit,
			preTest: e.preTest,
			addRemarksValue: e.remark
		})
	}
	addQuestionClicked = (e) => {
		console.log(e)
		console.log(e._id === undefined)
		if(e._id !== undefined){
			this.setValuesQuestionModal(e)
			this.setState({
				questionEditId: e._id
			})
		}
		this.setState({modalIsOpenQuestion: true});
	}
	setValuesQuestionModal = (e) => {
		if(e.type === 'TRUE-FALSE'){
			console.log(e)
			let preSelectedQuestionTypeFromResponse = []
			let preSelectedAnswerFromResponse = []
			preSelectedQuestionTypeFromResponse.push({name: e.type})
			preSelectedAnswerFromResponse.push({name: e.answer})
			this.setState({
				selectQuestionTypeValue: 'TRUE-FALSE',
				questionTypeSelected: true,
				preSelectedQuestionType: preSelectedQuestionTypeFromResponse,
				addQuestionValue: e.question,
				showOptions: false,
				preSelectedAnswer: preSelectedAnswerFromResponse
			})
		}
		if(e.type === 'MCQ'){
			console.log(e)
			let preSelectedQuestionTypeFromResponse = []
			let preSelectedAnswerFromResponse = []
			preSelectedQuestionTypeFromResponse.push({name: e.type})
			preSelectedAnswerFromResponse.push({name: e.answer})
			this.setState({
				selectQuestionTypeValue: 'MCQ',
				questionTypeSelected: true,
				preSelectedQuestionType: preSelectedQuestionTypeFromResponse,
				addQuestionValue: e.question,
				showOptions: true,
				addOption1Value: e.options[0].value,
				addOption2Value: e.options[1].value,
				addOption3Value: e.options[2].value,
				addOption4Value: e.options[3].value,
				preSelectedAnswer: preSelectedAnswerFromResponse
			})
		}
		if(e.type === 'DESCRIPTIVE'){
			console.log(e)
			let preSelectedQuestionTypeFromResponse = []
			preSelectedQuestionTypeFromResponse.push({name: e.type})
			console.log(preSelectedQuestionTypeFromResponse)
			this.setState({
				selectQuestionTypeValue: 'DESCRIPTIVE',
				questionTypeSelected: true,
				preSelectedQuestionType: preSelectedQuestionTypeFromResponse,
				addQuestionValue: e.question,
				showOptions: false,
				showAnswerDropdown: false
			})
		}
	}
	closeAddQuestionClicked = () => {
		this.setState({
			modalIsOpenQuestion: false,
			questionTypeSelected: false,
			selectQuestionTypeValue: null,
			preSelectedQuestionType: null,
			addQuestionValue: null,
			preSelectedAnswer: null,
			addOption1Value: null,
			addOption2Value: null,
			addOption3Value: null,
			addOption4Value: null,
			disableTypeQuestion: false
		});
	}
	closeAddTopicModal = () => {
		this.setState({
			preSelectedCourseList: null,
			preSelectedElementList: null,
			preSelectedTopicList: null,
			addQuizNameValue: null,
			questionLimit: null,
			idEditQuiz: null,
			preTest: null,
			addRemarksValue: null,
			modalIsOpenTopic: false
		})
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
        if(this.state.idEditQuiz){
			console.log(this.state.addQuizNameValue)
			console.log(this.state.sendingMultipleCoursesInTopic)
			console.log(this.state.sendingElementInTopic)
			console.log(this.state.sendingtopicInTopic)
			console.log(this.state.questionLimit)
			console.log(this.state.preTest)
			console.log(this.state.addRemarksValue)
			let quizSetString = {
				'_id': this.state.idEditQuiz,
				'title': this.state.addQuizNameValue,
				'rank': this.state.sendingMultipleCoursesInTopic? this.state.sendingMultipleCoursesInTopic : this.state.preSelectedCourseList[0]._id,
				'element': this.state.sendingElementInTopic? this.state.sendingElementInTopic : this.state.preSelectedElementList[0]._id ,
				'topic': this.state.sendingtopicInTopic? this.state.sendingtopicInTopic : this.state.preSelectedTopicList[0]._id,
				'questionLimit': this.state.questionLimit,
				'preTest': this.state.preTest,
				'remark': this.state.addRemarksValue
			}
			putQuiz(quizSetString).then(res => {
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
		if(!this.state.idEditQuiz){
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
				'remark': this.state.addRemarksValue
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
		console.log(this.state.courseList.data)
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
        showQuestions = (e) => {
            let dataString = {
                "email":"aadfsddf@adsdessf.com",
                "password":"aman",
                    }

            console.log(e.target.innerHTML)
            this.setState({
                clickedQuiz: e.target.innerHTML
            }, () => {
                let q = this.state.clickedQuiz
                console.log(this.state.quizList)
                // this.state.topicList.find(findingQuizObject)
				let quizObject = this.state.quizList.data.find(findingQuizObject)
				console.log(quizObject)
                if(!!quizObject){
                    this.setState({
                        quizQuestionObject: quizObject,
                        quizQuestionObjectTitle: quizObject.title,
                        showQuizQuestions: true
                    }, () => {
                        this.gettingQuizQuestions()
                    })
                }
                function findingQuizObject(f){
                    if(f.title === q) {
                        return f.title
                    }
                }
                console.log(dataString)
            })
        }
	gettingListTopic = () => {
		console.log(this.state.topicList.data)
			if(this.state.topicList){
				let topicListForDropdown = []

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
					topicListForDropdownState: []
                    // topicListMapOptions: this.state.topicList.data.map((log, i) => {
					// 	this.topicElementCourseFinder(log)
					// 	topicListForDropdown.push({name: log.topicName, _id: log._id})
					// 	this.setState({
					// 		topicListForDropdownState: topicListForDropdown
					// 	})
                    //     return (
                    //         <>
                    //         <option value={log.topicName}>{log.topicName}</option>
                    //         </>
                    //     )
                    // })  
                })
			}
	}
	topicElementCourseFinder = () => {
		this.state.topicList.data.map((log, i) => {
			console.log(log)
		})
		console.log('Shubham Anand')
		console.log(this.state.sendingMultipleCoursesInTopic)
		console.log(this.state.sendingElementInTopic)
		if(this.state.sendingMultipleCoursesInTopic && this.state.sendingElementInTopic){
			let topicListForDropdown = []
			console.log('Namaste')
			console.log(this.state.topicList.data)
			// let t = this
			for(let i=0; i< this.state.topicList.data.length; i++){
				if(this.state.topicList.data[i].element._id === this.state.sendingElementInTopic){
					for(let j=0; j< this.state.topicList.data[i].course.length; j++){
						if(this.state.topicList.data[i].course[j]._id === this.state.sendingMultipleCoursesInTopic){
							topicListForDropdown.push({name: this.state.topicList.data[i].topicName, _id: this.state.topicList.data[i]._id})
							this.setState({
										topicListForDropdownState: topicListForDropdown
									})
						}
					}
				}
			}
			// let foundElement = this.state.topicList.data.find(function(element){
			// 	return element.element._id === t.state.sendingElementInTopic
			// })
			// console.log(foundElement)
			// this.state.topicList.data.map((log, i) => {
			// 	let foundCourse = log.course.find(function(findingCourse){
			// 		return findingCourse._id === t.state.sendingMultipleCoursesInTopic
			// 	})
			// 	console.log(foundCourse)
			// })
		}
	}
	deleteTopicClickeds = (e) => {
		console.log('Came to this func')
		console.log(e)
		this.setState({
			modalIsOpenQuizDelete: true,
			logOfSelected: e
		}, () => {
			console.log(this.state.logOfSelected)
		})
	}
	deleteFuncQuiz = () => {
		if(this.state.logOfSelected){
			console.log(this.state.logOfSelected)
			this.deleteTopicClicked(this.state.logOfSelected)
		}
	}
	deleteTopicClicked = (e) => {
			let quizSetString = {
				'_id': e._id,
				'status': 0
			}
			putQuiz(quizSetString).then(res => {
				console.log(res)
				this.setState({
					topicList: res.data
				}, () => {
					this.fetchCall()
				})
				this.closeAddQuizDelete()
			})
			.catch(err => {
				alert(err)
			})
	}
	closeAddQuizDelete = () => {
		this.setState({
			modalIsOpenQuizDelete: false,
			logOfSelected: null,	
		})
	}
	gettingListQuiz = () => {
			if(this.state.quizList){
				this.setState({
					quizListMap: this.state.quizList.data.map((log, i) => {
						return (
							<>
							<tr>
								<td onClick={this.showQuestions.bind(log)} className='pointer'>{log.title}</td>
								{log.preTest && <td>Yes</td>}
								{!log.preTest && <td>No</td>}
                                <td className='text-underline' onClick={() => {this.addTopicClicked(log)}}><img src={editIcon} className='editIcon'/></td>
								<td className='text-underline' onClick={() => {this.deleteTopicClickeds(log)}}><img src={deleteIcon} className='editIcon'/></td>
							</tr>
							</>
						)
                    })
                })
			}
	}
	deleteCourseClickeds = (e) => {
		console.log('Came to this func')
		console.log(e)
		this.setState({
			modalIsOpenQuestionDelete: true,
			logOfSelected: e
		}, () => {
			console.log(this.state.logOfSelected)
		})
	}
	deleteFuncQuestion = () => {
		if(this.state.logOfSelected){
			console.log(this.state.logOfSelected)
			this.deleteCourseClicked(this.state.logOfSelected)
		}
	}
	deleteCourseClicked = (e) => {
		let dataString = {
			"_id": e._id,
			"status": 0
			}
			putQuestions(dataString).then(res => {
				this.closeAddQuestionClicked()
				this.gettingQuizQuestions()
				this.closeDeleteQuestionModal()
			})
	}
    closeDeleteQuestionModal = () => {
		this.setState({
			modalIsOpenQuestionDelete: false,
			logOfSelected: null,	
		})
	}
    gettingQuizQuestions = () => {
		let dataString = {
			"email":"aadfsddf@adsdessf.com",
			"password":"aman",
				}
		console.log('Came to question')
		let quiz = this.state.quizQuestionObject._id
		let status = '1'
		console.log(this.state.quizQuestionObject)
		getQuestions(dataString, quiz, status).then(res => {
			console.log(res)
			this.setState({
				questionLists: res.data
			}, () => {
				if(this.state.questionLists){
					console.log(this.state.questionLists)
					this.setState({
						quizQuestionMap: this.state.questionLists.data.map((log, i) => {
							return (
								<>
								<tr>
									<td>{log.question}</td>
									<td> {log.type}</td>
									<td className='text-underline pointer' onClick={() => {this.addQuestionClicked(log)}} ><img src={editIcon} className='editIcon'/></td>
									<td className='text-underline pointer' onClick={() => {this.deleteCourseClickeds(log)}}><img src={deleteIcon} className='editIcon'/></td>
								</tr>
								</>
							)
						})
					})
				}
			})
		});
	}
	selectQuestionType = (e) => {
		console.log(e)
		let value = e.target.value
		this.setState({
			selectQuestionTypeValue: value
		}, () => {
			this.contentAccordingToQuestionType()
			console.log(this.state.selectQuestionTypeValue)
		})
	}
	selectedQuestionType = (e) => {
		console.log(e[0].name)
		this.setState({
			selectQuestionTypeValue: e[0].name
		}, () => {
			this.setState({
				questionTypeSelected: true
			}, () => {
				this.contentAccordingToQuestionType()
				console.log(this.state.selectQuestionTypeValue)
			})
		})
	}
	contentAccordingToQuestionType = () => {
		if(this.state.selectQuestionTypeValue === 'MCQ'){
			this.setState({
				showOptions: true,
				showAnswerDropdown: true
			})
		}
		if(this.state.selectQuestionTypeValue === 'TRUE/FALSE'){
			this.setState({
				showOptions: false,
				showAnswerDropdown: true
			})
		}
		if(this.state.selectQuestionTypeValue === 'DESCRIPTIVE'){
			this.setState({
				showOptions: false,
				showAnswerDropdown: false
			})
		}
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
	answerDropdownClicked = () => {
		if(this.state.selectQuestionTypeValue === 'MCQ'){
			let allOptions = []
			allOptions.push({name: this.state.addOption1Value})
			allOptions.push({name: this.state.addOption2Value})
			allOptions.push({name: this.state.addOption3Value})
			allOptions.push({name: this.state.addOption4Value})
			this.setState({
				optionListData: allOptions
			}, () => {
				console.log(this.state.optionListData)
				this.answerSelectFunctions()
			})
		}
		if(this.state.selectQuestionTypeValue === 'TRUE/FALSE'){
			let allOptions = []
			allOptions.push({name: 'TRUE'})
			allOptions.push({name: 'FALSE'})
			this.setState({
				optionListData: allOptions
			}, () => {
				console.log(this.state.optionListData)
				this.answerSelectFunctions()
			})
		}
		if(this.state.selectQuestionTypeValue === 'DESCRIPTIVE'){
			this.setState({
				optionListData: null
			}, () => {
				console.log(this.state.optionListData)
			})	
		}
	}
	
	answerSelectFunctions = () => {
		this.setState({
			showAnswerOpton: this.state.optionListData.map((log, i) => {
				return (
					<>
						<option value={log.name}>{log.name}</option>
					</>
				)
			})
		})
	}

	answerSelectFunction = (e) => {
		this.setState({
			exactAnswerOfQuestion : e[0].name
		})
	}
	saveQuestionValue = () => {
		// this.state.addOption1Value
		if(this.state.selectQuestionTypeValue === 'MCQ'){
			if(this.state.questionEditId){
				this.setState({
					disableTypeQuestion : true
				}, () => {
					if(this.state.questionEditId && 
						this.state.addQuestionValue && 
						this.state.addOption1Value &&
						this.state.addOption2Value &&
						this.state.addOption3Value &&
						this.state.addOption4Value &&
						this.state.exactAnswerOfQuestion &&
						this.state.quizQuestionObject._id
						){
						let dataString = {
							"_id": this.state.questionEditId,
							"question": this.state.addQuestionValue,
							"media": this.state.uploadUrl,
							"options":[{
								"value": this.state.addOption1Value
							}, {
								"value": this.state.addOption2Value
							}, {
								"value": this.state.addOption3Value
							}, {
								"value": this.state.addOption4Value
							}],
							"type":"MCQ",
							"answer":this.state.exactAnswerOfQuestion,
							"quiz": this.state.quizQuestionObject._id
							}
							putQuestions(dataString).then(res => {
								this.closeAddQuestionClicked()
								this.gettingQuizQuestions()
							})
					}
					else{
						alert('Please fill all the mandatory fields')
					}
				})
			}
			if(!this.state.questionEditId){
				if( this.state.addQuestionValue && 
					this.state.addOption1Value &&
					this.state.addOption2Value &&
					this.state.addOption3Value &&
					this.state.addOption4Value &&
					this.state.exactAnswerOfQuestion &&
					this.state.quizQuestionObject._id){
					let dataString = {
						"question": this.state.addQuestionValue,
						"media": this.state.uploadUrl,
						"options":[{
							"value": this.state.addOption1Value
						}, {
							"value": this.state.addOption2Value
						}, {
							"value": this.state.addOption3Value
						}, {
							"value": this.state.addOption4Value
						}],
						"type":"MCQ",
						"answer":this.state.exactAnswerOfQuestion,
						"quiz": this.state.quizQuestionObject._id
						}
						postQuestions(dataString).then(res => {
							this.closeAddQuestionClicked()
							this.gettingQuizQuestions()
						})
				}
				else{
					alert('Please fill all the mandatory fields')
				}
			}
		}
		if(this.state.selectQuestionTypeValue === 'TRUE/FALSE'){
			if(this.state.questionEditId){
				this.setState({
					disableTypeQuestion : true
				}, () => {
					if(this.state.questionEditId && 
						this.state.addQuestionValue && 
						this.state.exactAnswerOfQuestion &&
						this.state.quizQuestionObject._id){
						let dataString = {
							"_id": this.state.questionEditId,
							"question": this.state.addQuestionValue,
							"media": this.state.uploadUrl,
							"options":[{
								"value": 'TRUE'
							}, {
								"value": 'FALSE'
							}],
							"type": "TRUE-FALSE",
							"answer":this.state.exactAnswerOfQuestion,
							"quiz": this.state.quizQuestionObject._id
							}
							putQuestions(dataString).then(res => {
								this.closeAddQuestionClicked()
								this.gettingQuizQuestions()
							})
					}
					else{
						alert('Please fill all the mandatory fields')
					}
				})
			}
			if(!this.state.questionEditId){
				if( this.state.addQuestionValue && 
					this.state.exactAnswerOfQuestion &&
					this.state.quizQuestionObject._id){
					let dataString = {
						"question": this.state.addQuestionValue,
						"media": this.state.uploadUrl,
						"options":[{
							"value": 'TRUE'
						}, {
							"value": 'FALSE'
						}],
						"type": "TRUE-FALSE",
						"answer":this.state.exactAnswerOfQuestion,
						"quiz": this.state.quizQuestionObject._id
						}
						postQuestions(dataString).then(res => {
							this.closeAddQuestionClicked()
							this.gettingQuizQuestions()
						})
				}
				else{
					alert('Please fill all the mandatory fields')
				}
			}
		}
		if(this.state.selectQuestionTypeValue === 'DESCRIPTIVE'){
			if(this.state.questionEditId){
				this.setState({
					disableTypeQuestion : true
				}, () => {
					if(this.state.questionEditId &&
						this.state.addQuestionValue &&
						this.state.quizQuestionObject._id){
						let dataString = {
							"_id": this.state.questionEditId,
							"question": this.state.addQuestionValue,
							"media": this.state.uploadUrl,
							"type":"DESCRIPTIVE",
							"quiz": this.state.quizQuestionObject._id
							}
							putQuestions(dataString).then(res => {
								this.closeAddQuestionClicked()
								this.gettingQuizQuestions()
							})
					}
					else{
						alert('Please fill all the mandatory fields')
					}
				})
			}
			if(!this.state.questionEditId){
				if( this.state.addQuestionValue &&
					this.state.quizQuestionObject._id){
					let dataString = {
						"question": this.state.addQuestionValue,
						"media": this.state.uploadUrl,
						"type":"DESCRIPTIVE",
						"quiz": this.state.quizQuestionObject._id
						}
						postQuestions(dataString).then(res => {
							this.closeAddQuestionClicked()
							this.gettingQuizQuestions()
						})
				}
			}
		}
	}
	/* 
	    'title': this.state.addQuizNameValue,
		'rank': this.state.sendingMultipleCoursesInTopic,
		'element': this.state.sendingElementInTopic,
		'topic': this.state.sendingtopicInTopic,
		'questionLimit': this.state.questionLimit,
		'preTest': this.state.preTest,
		'remarks': this.state.addRemarksValue
	*/
	selectedCourseListDropdown = (e) => {
		this.setState({
			sendingMultipleCoursesInTopic: e[0]._id
		}, () => {
			this.topicElementCourseFinder()
		})
	}
	selectedElementListDropdown = (e) => {
		this.setState({
			sendingElementInTopic: e[0]._id
		}, () => {
			this.topicElementCourseFinder()
		})
	}
	selectedTopicListDropdown = (e) => {
		this.setState({
			sendingtopicInTopic: e[0]._id
		})
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
						{this.state.showQuizQuestions && <div className='mainTab'>
							<div className='row top-nav'>
								<div className="col-xl-12 col-lg-12 col-md-12 text-center pointer row">
									<div onClick={() => {
                                        this.setState({showQuizQuestions: false})
                                    }} className='pointer col-lg-1'>
										<img src={backIcon}  className='editIcon'/> 
                                        </div> 
                                    <div className='text-center pointer col-lg-11 py-10'>
                                        Questions: {this.state.quizQuestionObjectTitle}
                                    </div>
								</div>
							</div>
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Question</th>
										<th>Type</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
									{this.state.quizQuestionMap}
									</table>
									</div>
								
									<div className='bottom-button wd-184'>
										<button className='br-4 button px-4 py-1' onClick={this.addQuestionClicked}> + Add Question</button>
									</div>
									<Modal
									isOpen={this.state.modalIsOpenQuestion}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>New Quiz</h6>
									</div>
									<div className='form-element py-40'>										
									<div className='col-lg-12'>
											Question Type
										{/* <select name="cars" className='single-select-style' onChange={this.selectQuestionType}>
											<option selected="true" disabled="disabled">Select the Question type</option>    
											<option value= 'MCQ'>MULTIPLE-TYPE</option>
											<option value= 'TRUE/FALSE' >TRUE/FALSE</option>
											<option value= 'DESCRIPTIVE'>DESCRIPTIVE</option>
										</select> */}
										<Multiselect
											options={this.state.optionSelectList}
											onSelect={this.selectedQuestionType} 
											onRemove={this.selectedQuestionType} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedQuestionType}
											disablePreSelectedValues = {this.state.disableTypeQuestion}
											/>
										</div>
										{this.state.questionTypeSelected && <div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addQuestionValue} onChange={e => this.setState({ addQuestionValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Question </span>
											</label>
										</div>
									</div>}
										{this.state.questionTypeSelected && <div className='col-lg-12 py-10'>
											Question Image
										<input type='file' onChange={this.fileUploadQuestionImage} accept="image/x-png,image/gif,image/jpeg"/>
										{/* onChange={e => this.setState({ addQuestionImageValue: e.target.value })} */}
										</div>}
									{this.state.questionTypeSelected && this.state.showOptions &&	<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addOption1Value} onChange={e => this.setState({ addOption1Value: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Option 1</span>
											</label>
										</div>
									</div>}
									{this.state.questionTypeSelected && this.state.showOptions && <div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addOption2Value} onChange={e => this.setState({ addOption2Value: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Option 2</span>
											</label>
										</div>
									</div>}
									{this.state.questionTypeSelected && this.state.showOptions && <div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addOption3Value} onChange={e => this.setState({ addOption3Value: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Option 3</span>
											</label>
										</div>
									</div>}
									{this.state.questionTypeSelected && this.state.showOptions && <div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addOption4Value} onChange={e => this.setState({ addOption4Value: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Option 4</span>
											</label>
										</div>
									</div>}
								{this.state.questionTypeSelected && this.state.showAnswerDropdown && <div className='py-10'>
											
										{/* <select name="cars" onChange={this.answerSelectFunction} onClick={this.answerDropdownClicked} className='single-select-style'>
											<option selected="true" disabled="disabled">Choose the answer</option>
											{this.state.showAnswerOpton}
										</select> */}
										<div onClick={this.answerDropdownClicked} className='col-lg-12'>
										Answer
										<Multiselect
											options={this.state.optionListData}
											onSelect={this.answerSelectFunction} 
											onRemove={this.answerSelectFunction} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedAnswer}
											/>
										</div>
										</div>}
									</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddQuestionClicked}></img>
									<button onClick={this.saveQuestionValue} className='save-button-style'>Save</button>
								</Modal>
								{/* Modal for the confirmation of the Delete option | Course | Start */}
								<Modal
									isOpen={this.state.modalIsOpenQuestionDelete}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStylesDelete}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Confirm Delete ?</h6>
									</div>
									<div className='col-lg-12 col-md-12 col-sm-12 row m-0 my-50'>
									  <button onClick={this.deleteFuncQuestion} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>Yes</button>
									  <div className='col-lg-4 col-md-4 col-sm-4'></div>
									  <button onClick={this.closeAddQuestionDeleteModal} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>No</button>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style pointer' onClick={this.closeAddQuestionDeleteModal}></img>
									{/* <button onClick={this.saveCourseValue} className='save-button-style'>Save</button> */}
								</Modal>
								{/* Modal for the confirmation of the Delete option | End */}
							</>
                        </div>}
                        {!this.state.showQuizQuestions && <div className='mainTab'>
							<div className='row top-nav'>
								<div className="col-xl-12 col-lg-12 col-md-12 text-center pointer text-underline">
									Quiz
								</div>
							</div>
								<>
									<div className='table-div'>
									<table>
									<tr>
										<th>Titles</th>
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
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>New Quiz</h6>
									</div>
									<div className='form-element'>										
										<div className='col-lg-12 py-10' >
											Employee Designation
										<Multiselect
											options={this.state.courseList.data}
											onSelect={this.selectedCourseListDropdown} 
											onRemove={this.selectedCourseListDropdown} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Rank'
											selectedValues = {this.state.preSelectedCourseList}
											/>
										</div>
										<div className='col-lg-12 py-10'>
											Branch
										<Multiselect
											options={this.state.elementList.data}
											onSelect={this.selectedElementListDropdown} 
											onRemove={this.selectedElementListDropdown} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select '
											selectedValues = {this.state.preSelectedElementList}
											/>
										</div>
										<div className='col-lg-12 py-10'>
											Sub-branch
										<Multiselect
											options={this.state.topicListForDropdownState}
											onSelect={this.selectedTopicListDropdown} 
											onRemove={this.selectedTopicListDropdown} 
											displayValue="name" 
											singleSelect='true'
											placeholder='Select Type'
											selectedValues = {this.state.preSelectedTopicList}
											/>
										</div>
										<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addQuizNameValue} onChange={e => this.setState({ addQuizNameValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Title of Test</span>
											</label>
										</div>
									</div>
										<div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='number' className='' name='age' id='age' autoComplete='off' value={this.state.questionLimit} onChange={e => this.setState({ questionLimit: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Please Enter Question Limit</span>
											</label>
										</div>
									</div>
                                    <div className='form-element col-lg-12'>										
										<div className='indi-form-text'>
											<input type='text' className='' name='age' id='age' autoComplete='off' value={this.state.addRemarksValue} onChange={e => this.setState({ addRemarksValue: e.target.value })} required />
											<label for='age' className='label-name'>
												<span className='content-name'>Remarks</span>
											</label>
										</div>
									</div>
                                    <div className='form-element col-lg-12 py-10'>		
                                    Pre Test								
											<input type='checkbox' className='mx-3' name='age' id='age' autoComplete='off' value={this.state.preTest} checked={this.state.preTest} onChange={e => this.setState({ preTest: !this.state.preTest })} />
									</div>
									</div>
									{/* <button onClick={this.closeAddTopicModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style' onClick={this.closeAddTopicModal}></img>
									<button onClick={this.saveQuizValue} className='save-button-style'>Save</button>
								</Modal>
								{/* Modal for the confirmation of the Delete option | Course | Start */}
								<Modal
									isOpen={this.state.modalIsOpenQuizDelete}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStylesDelete}
									contentLabel="Example Modal"
								>
									<div className='border-bottom'>
										<h6 ref={subtitle => this.subtitle = subtitle}>Confirm Delete ?</h6>
									</div>
									<div className='col-lg-12 col-md-12 col-sm-12 row m-0 my-50'>
									  <button onClick={this.deleteFuncQuiz} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>Yes</button>
									  <div className='col-lg-4 col-md-4 col-sm-4'></div>
									  <button onClick={this.closeAddQuestionDeleteModal} className='yes-no-button col-lg-4 col-md-4 col-sm-4'>No</button>
									</div>
									{/* <button onClick={this.closeAddCourseModal} className='close-button-style'>Close Me</button> */}
									<img src = {closeIcon} className='common-close-button close-button-style pointer' onClick={this.closeAddQuestionDeleteModal}></img>
									{/* <button onClick={this.saveCourseValue} className='save-button-style'>Save</button> */}
								</Modal>
								{/* Modal for the confirmation of the Delete option | End */}
							</>
						</div>}
					</div>
				</div>
			</div>
		);
	}
}

export default Quix;
