import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";
// perfios online statment API
export const startOnlineBanking = requestBody => {
	console.log(`${ApiList.endpoint.perfiosOnlineStart} === ${qs.stringify(requestBody)}`);

	return axios.post(`${ApiList.endpoint.perfiosOnlineStart}`, qs.stringify(requestBody), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
