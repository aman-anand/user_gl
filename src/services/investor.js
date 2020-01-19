import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

export const investorDetails = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	return axios.post(`${ApiList.env}${ApiList.endpoint.investorDetails}`, qs.stringify(requestBody), config);
};

