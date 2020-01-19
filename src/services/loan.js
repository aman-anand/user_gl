import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

export const applyLoan = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	return axios.post(`${ApiList.env}${ApiList.endpoint.applyLoan}`, qs.stringify(requestBody), config);
};

export const fetchMatchingLoan = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.searchLoan}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
export const loanDetail = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.loanDetail}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

export const updateLoan = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.updateLoan}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
