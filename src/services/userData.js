import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

// update user profile for recent loan
export const personalProfileUpdate = async datastring => {
	return await axios.post(`${ApiList.env}${ApiList.endpoint.personalProfileUpdate}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

// Fetch user details
export const fetchUserDetails = async datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.userDetails}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
// fetch user details for recen loan
export const fetchUserDetailsAll = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.userDetailsAll}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
export const fetchCreditScore = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.fetchCreditScore}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

// Normal profile update
export const profileUpdate = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.profileUpdate}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
