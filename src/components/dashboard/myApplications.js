import React, { Component } from "react";

import Navigation from "../nav/dashboardNavigation";
import moment from "moment";
import './myApplication.scss';

// API
import { loanDetail } from "../../services/loan";
import { fetchUserDetails } from "../../services/userData";
// images
import Car from "../../images/sakal-car.svg";
import Home from "../../images/home-loan.svg";
import Check from "../../images/check-big.svg";
import BankAllocated from "../../images/bank-allocated.svg";
import AxisBank from "../../images/Axis-Bank.png";
import { getCourses } from "../../services/masters";
import axios from "axios";
class MyApplications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanList: [],
			userData:''
		};
	}

	fetchCall = () => {
		console.log('Came to this function')
		let dataString = {
			"email":"aadfsddf@adsdessf.com",
			"password":"aman",
				}
		getCourses(dataString).then(res => {
			console.log(res)
		});
		// axios.get(`https://15.206.124.63/apis/courses`)
		// .then(res => {
		// 	console.log('Testing')
		// })
	}
	componentDidMount() {
		this.fetchCall()
	}
	// Get user data to prefill the data
	render() {
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
								<div className='col-xl-4 col-lg-4 col-md-4 text-center text-underline'>
									Courses
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4 text-center'>
									Elements
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4 text-center'>
									Topics
								</div>
							</div>
								<div className='table-div'>
								<table>
								<tr>
									<th>Name</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
								<tr>
									<td>Alfreds Futterkiste</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								<tr>
									<td>Centro comercial Moctezuma</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								<tr>
									<td>Ernst Handel</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								<tr>
									<td>Island Trading</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								<tr>
									<td>Laughing Bacchus Winecellars</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								<tr>
									<td>Magazzini Alimentari Riuniti</td>
									<td className='text-underline'>Edit</td>
									<td className='text-underline'>Delete</td>
								</tr>
								</table>
								</div>
							<div className='bottom-button'>
								<button className='br-4 button px-4 py-1'> + Add</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyApplications;
