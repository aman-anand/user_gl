import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";
import newqs from "qs";

export const otherDetailsAddCoApplicant = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
    };
    console.log(newqs.stringify(requestBody));
	return axios.post(`${ApiList.env}${ApiList.endpoint.coApplicantDetails}`, newqs.stringify(requestBody), config);
};

export const otherDetailsAddReference = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	return axios.post(`${ApiList.env}${ApiList.endpoint.addReferenceDetails}`, qs.stringify(requestBody), config);
};

// export const fetchMatchingLoan = datastring => {
// 	return axios.post(`${ApiList.env}${ApiList.endpoint.searchLoan}`, qs.stringify(datastring), {
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		}
// 	});
// };
// export const loanDetail = datastring => {
// 	return axios.post(`${ApiList.env}${ApiList.endpoint.loanDetail}`, qs.stringify(datastring), {
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		}
// 	});
// };
