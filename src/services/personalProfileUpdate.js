import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

// Personal Profile Update
export const personalProfileUpdate = async requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	return await axios.post(`${ApiList.env}${ApiList.endpoint.personalProfileUpdate}`, qs.stringify(requestBody), config);
};
